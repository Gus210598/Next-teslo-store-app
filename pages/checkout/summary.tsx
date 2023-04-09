import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Typography, Grid, Card, CardContent, Divider, Button, Link } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { CartList } from '@/components/cart';
import { OrderSummary } from '@/components/cart';
import { CartContext } from '@/context';
import { countries } from '@/utils';


const SummaryPage = () => {

    const { shippingAddress, numberOfItem } = useContext(CartContext);

    if ( !shippingAddress ) {
        return <></>;
    }
    
    const { firstName, lastName, address, address2='', city, country, phone, zip } = shippingAddress;
        
    return (
    <ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* CartList */}
                <CartList />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card' >
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItem} {numberOfItem===1 ? 'Producto' : 'Productos'})</Typography>
                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='space-between' >

                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref legacyBehavior >
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography >{ firstName } { lastName } </Typography>
                        <Typography >{ address }{ address2 ? `, ${address2}` : '' }</Typography>
                        <Typography >{ city }, { zip }</Typography>
                        <Typography >{ countries.find( c => c.code === country )?.name }</Typography>
                        <Typography >{ phone }</Typography>

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
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar orden
                            </Button>

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
    )
}

export default SummaryPage