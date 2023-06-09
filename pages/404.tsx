import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layout/ShopLayout';


const Custom404 = () => {
  return (
    <ShopLayout title={'Page not found'} pageDescription={'No hay nada que mostrar aqui'} >
        <Box 
            marginTop= '220px'
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh-200px)' 
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <Typography variant='h1' component='h1' fontSize={100} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2}>No encontramos ninguna página aqui</Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404;
