import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";

import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

interface Props {
    children: ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider: FC<Props> = ({ children }) => {

    const { data, status } = useSession()

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
        if ( status === 'authenticated' ) {
            // console.log({ user: data?.user});
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }
    
    }, [ status, data ])
    

    // useEffect(() => {
    //     checkToken()
    // }, [])
    

    const checkToken = async() => {

        if ( !Cookies.get('token')) {
            return;
        }
        // llamar endpoint - revalidar token guardando el nuevo - dispatch login - si sale mal borrar token de cookies
        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
  
        } catch (error) {
            Cookies.remove('token');
            
        }
    }


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true

        } catch (error) {
            return false
            
        }
    }

    const logout = async() => {
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        signOut();
        // Cookies.remove('token');
        // router.reload();
    }

    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            // Todo: return
            return { 
                hasError: false,
            }
        } catch (error) {
            if ( axios.isAxiosError( error )) {
                return { 
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se puedo crear el usuario intente de nuevo'
            }
            
        }
    }

  return (
    <AuthContext.Provider value={{
        ...state,

        // Methods
        loginUser,
        logout,
        registerUser,
    }} >
        { children }
    </AuthContext.Provider>
  )
}
