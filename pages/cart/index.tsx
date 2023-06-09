import { Box, Typography, Grid, Card, CardContent, Divider, Button } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { CartList } from '@/components/cart';
import { OrderSummary } from '@/components/cart';



const CartPage = () => {
  return (
    <ShopLayout title={'Carrito - 3'} pageDescription={'Carrito de compras de la tienda'}>
        <Typography variant='h1' component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* CartList */}
                <CartList editable />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card' >
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{ my:1 }}/>

                        {/* Order Summary */}
                        <OrderSummary />


                        <Box sx={{ mt: 3 }}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Checkout
                            </Button>

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default CartPage