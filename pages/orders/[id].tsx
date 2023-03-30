
import NextLink from 'next/link';
import { Box, Typography, Grid, Card, CardContent, Divider, Link, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { CartList } from '@/components/cart';
import { OrderSummary } from '@/components/cart';

import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';


const OrderPage = () => {
    return (
    <ShopLayout title={'Resumen de la orden 58585285'} pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Orden: ABC88285</Typography>

        {/* <Chip 
            sx={{ my: 2 }}
            label= "Pendiente de pago"
            variant='outlined'
            color='error'
            icon={ <CreditCardOffOutlinedIcon /> }
        /> */}

        <Chip 
            sx={{ my: 2 }}
            label= "Odern ya fue pagada"
            variant='outlined'
            color='success'
            icon={ <CreditScoreOutlinedIcon /> }
        />

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* CartList */}
                <CartList />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card' >
                    <CardContent>
                        <Typography variant='h2'>Resumen ( 3 productos )</Typography>
                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='space-between' >

                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref legacyBehavior >
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography >Jenny Aparicio</Typography>
                        <Typography >Mi casa</Typography>
                        <Typography >San Miguelito, 30a</Typography>
                        <Typography >Panamá</Typography>
                        <Typography >+507 333222555</Typography>

                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='end' >
                            <NextLink href='/cart' passHref legacyBehavior >
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        {/* Order Summary */}
                        <OrderSummary />


                        <Box sx={{ mt: 3 }}>
                            {/* TODO */}
                            <h1>Pagar</h1>

                            <Chip 
                                sx={{ my: 2 }}
                                label= "Odern ya fue pagada"
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlinedIcon /> }
                            />

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
    )
}

export default OrderPage
