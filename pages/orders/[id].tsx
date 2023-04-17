import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { PayPalButtons } from "@paypal/react-paypal-js";

import { Box, Typography, Grid, Card, CardContent, Divider, Chip, CircularProgress } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { CartList } from '@/components/cart';
import { OrderSummary } from '@/components/cart';

import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { tesloApi } from '@/api';


export type OrderResponseBody = {
    id: string;
    
    status:
        | "CREATED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "COMPLETED"
        | "PAYER_ACTION_REQUIRED";
}

interface Props {
    order   : IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    // console.log({order});
    const router = useRouter();
    const { shippingAddress } = order;
    const { numberOfItems, subTotal, tax, total } = order;

    const [isPaying, setIsPaying] = useState(false)

    const onOrderCompleted = async( details: OrderResponseBody ) => {
        if ( details.status !== 'COMPLETED' ) {
            return alert('No hay pago en paypal');
        }
        setIsPaying( true );

        try {
            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id,
            });

            router.reload();
            
        } catch (error) {
            setIsPaying( false );
            console.log(error);
            alert('Error');
        }
    }

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
                            <Box 
                                display='flex' 
                                justifyContent='center' 
                                className= 'fadeIn'
                                sx={{ display: isPaying ? 'flex' : 'none' }} 
                            >
                                <CircularProgress />
                            </Box>
                            <Box sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }} flexDirection='column'>
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
                                        <PayPalButtons 
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: `${order.total}`,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order!.capture().then((details) => {
                                                    console.log({details})
                                                    onOrderCompleted( details );
                                                    // const name = details.payer.name.given_name;
                                                    // alert(`Transaction completed by ${name}`);
                                                });
                                            }}
                                        />
                                    )
                                }
                            </Box>
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

