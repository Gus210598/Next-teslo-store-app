import { useContext, useState } from 'react';
import NextLink from 'next/link';

import { Box, Typography, Grid, Button, TextField, Link, Chip } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useForm } from 'react-hook-form';

import { AuthLayout } from "@/components/layout"
import { validations } from '@/utils';
import { tesloApi } from '@/api';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';

type FormData = {
    email   : string,
    password: string,
  };


const LoginPage = () => {

    const router = useRouter();
    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    // console.log({ errors })

    const [showError, setShowError] = useState(false)

    const onLoginUser = async({ email, password }: FormData ) => {

        setShowError( false );

        const isValidLogin = await loginUser( email, password );

        if ( !isValidLogin ) {
            setShowError( true );
            setTimeout(() => { setShowError( false )}, 3000)
            return;
        }
       
        // Todo: navegar a la pantalla que el usuario estaba
        const destination = router.query.p?.toString() || '/'
        router.replace( destination );
    }
    
  return (
    <AuthLayout title= 'Ingresar' >
        <form onSubmit={ handleSubmit( onLoginUser ) } noValidate>
            <Box sx={{ width: 350, padding: '150px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1' >Iniciar Sesión</Typography>
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
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth 
                            { 
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
                            type= 'submit'
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
                            href={ router.query.p ? `/auth/register?p=${ router.query.p }` : '/auth/register' }
                            passHref 
                            legacyBehavior
                        >
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>        
        </form>
    </AuthLayout>
  )
}

export default LoginPage