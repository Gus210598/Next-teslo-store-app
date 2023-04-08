import { Box, CircularProgress, Typography } from '@mui/material';


export const FullScreenLoading = () => {
  return (
    <Box 
        sx={{ mt: 10 }}
        flexDirection= 'column'
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh-200px)' 
    >
        <Typography sx={{ mb: 3 }} variant="h2" fontWeight={ 200 } fontSize={ 35 }>Cargando...</Typography>
        <CircularProgress thickness={ 2 } />
    </Box>
  )
}
