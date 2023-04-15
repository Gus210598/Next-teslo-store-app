import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next'

import { Box, Typography, Grid, Card, CardContent, Divider, Link, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { CartList } from '@/components/cart';
import { OrderSummary } from '@/components/cart';

import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

interface Props {
    order   : IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    // console.log({order});
    const { shippingAddress } = order;
    const { numberOfItems, subTotal, tax, total } = order;

    return (
    <ShopLayout title={'Resumen de la orden'} pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Orden: { order._id } </Typography>
        {
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label= "Odern ya fue pagada"
                    variant='outlined'
                    color='success'
                    icon={ <CreditScoreOutlinedIcon /> }
                />

            )
            : (
                <Chip 
                    sx={{ my: 2 }}
                    label= "Pendiente de pago"
                    variant='outlined'
                    color='error'
                    icon={ <CreditCardOffOutlinedIcon /> }
                />
            )
        }

        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                {/* CartList */}
                <CartList products={ order.orderItems } />
            </Grid>

            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card' >
                    <CardContent>
                        <Typography variant='h2'>Resumen { order.numberOfItems } { order.numberOfItems>1 ? 'productos' : 'producto'} </Typography>
                        <Divider sx={{ my:1 }}/>

                        <Box display='flex' justifyContent='space-between' >
                            <Typography variant='subtitle1' >Dirección de entrega</Typography>
                        </Box>

                        <Typography >{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography >{ shippingAddress.address } { shippingAddress.address2 ?`, ${ shippingAddress.address2 }` : '' } </Typography>
                        <Typography >{ shippingAddress.city } { shippingAddress.zip } </Typography>
                        <Typography >{ shippingAddress.country } </Typography>
                        <Typography >{ shippingAddress.phone } </Typography>

                        <Divider sx={{ my:1 }}/>

                        {/* Order Summary */}
                        <OrderSummary orderValues={{ 
                            numberOfItems,
                            subTotal,
                            tax,
                            total,
                         }} />


                        <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>
                            {/* TODO */}
                            {
                                order.isPaid
                                ? (
                                    <Chip 
                                        sx={{ my: 2 }}
                                        label= "Odern ya fue pagada"
                                        variant='outlined'
                                        color='success'
                                        icon={ <CreditScoreOutlinedIcon /> }
                                    />

                                )
                                :
                                (
                                    <h1>Pagar</h1>
                                )
                            }


                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id= ' '}= query;
    const session: any = await getSession({ req });
    
    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );
    if ( !order ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if ( order.user !== session.user._id ){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage

