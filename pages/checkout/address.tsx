import { Box, Typography, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';

const AddressPage = () => {
  return (
    <ShopLayout title='Dirección' pageDescription='Confirmar dirección del destino' >
        <Typography variant='h1' component='h1' >Dirección</Typography>

        <Grid container spacing={ 2 } sx={{ mt: 2 }} >
            
            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Nombre' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Apellido' variant='filled' fullWidth />
            </Grid>
            
            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Dirección' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Dirección 2' variant='filled' fullWidth />
            </Grid>
            
            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Código postal' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Ciudad' variant='filled' fullWidth />
            </Grid>
            
            <Grid item xs={ 12 } sm= { 6 }>
                <FormControl fullWidth >
                    <InputLabel>País</InputLabel>
                    <Select
                        variant='filled'
                        label='País'
                        value= { 1 }
                    >
                        <MenuItem value={1} >Chilito</MenuItem>
                        <MenuItem value={1} >Sweden</MenuItem>
                        <MenuItem value={1} >México</MenuItem>
                        <MenuItem value={1} >Panamá</MenuItem>
                        
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={ 12 } sm= { 6 }>
                <TextField label='Teléfono' variant='filled' fullWidth />
            </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center' > 
            <Button color='secondary' className='circular-btn' size='large'>
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage