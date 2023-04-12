import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import { useForm } from 'react-hook-form';
import { Box, Typography, Grid, Button, TextField, Link, Chip } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';


import { AuthLayout } from "@/components/layout"
import { validations } from '@/utils';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';

type FormData = {
    name    : string,
    email   : string,
    password: string,
  };

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    // console.log({ errors })

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onRegisterForm = async({ name, email, password }: FormData  ) => {

        setShowError( false );

        const { hasError, message } = await registerUser( name, email, password );

        if ( hasError ) {
            setShowError( true );
            setErrorMessage( message || '' )
            setTimeout(() => { setShowError( false )}, 3000)
            return;
        }
       
        // Todo: navegar a la pantalla que el usuario estaba
        // const destination = router.query.p?.toString() || '/'
        // router.replace( destination );
        await signIn( 'credentials', { email, password });
     
    }

  return (
    <AuthLayout title= 'Crear cuenta' >
        <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
            <Box sx={{ width: 350, padding: '150px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1' >Crear cuenta</Typography>
                        <Chip
                            label='No reconocemos ese usuario / contraseña'
                            color='error'
                            icon= { <ErrorOutlineOutlinedIcon /> }
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none' }}
                         />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='text'
                            label='Nombre completo' 
                            variant='filled' 
                            fullWidth 
                            { 
                                ...register( 'name', {
                                    required: 'Nombre requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres'}
                                }) 
                            }
                            error= { !!errors.name }
                            helperText= { errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='email'
                            label='Correo' 
                            variant='filled' 
                            fullWidth 
                            { 
                                ...register( 'email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                }) 
                            }
                            error= { !!errors.email }
                            helperText= { errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            typeof='password'
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth { 
                                ...register( 'password', {
                                    required: 'Contraeña requerida',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres'}
                                }) 
                            }
                            error= { !!errors.password }
                            helperText= { errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type='submit'
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            fullWidth
                            disabled={ showError } 

                        >
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login' }
                            passHref 
                            legacyBehavior
                        >
                            <Link underline='always'>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>        
        </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { p = '/' } = query;

    const session = await getSession({ req });

    if ( session ){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default RegisterPage
