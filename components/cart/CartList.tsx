import NextLink from 'next/link';

import { Box, Typography, Grid, Button, Link, CardActionArea, CardMedia } from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';
import { FC } from 'react';


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {


  return (
    <>
        {
            productsInCart.map( product => (
                <Grid container spacing={ 2 } key={ product.slug } sx={{ mb: 1}} >
                    <Grid item xs={3}>
                        {/* TODO: llevar a la página del producto */}
                        <NextLink href="/product/slug"></NextLink>
                        <Link>
                            <CardActionArea>
                                <CardMedia 
                                    image={ `/products/${ product.images[0] }` }
                                    component='img'
                                    sx={{ borderRadius: '5px' }}
                                />
                                
                            </CardActionArea>
                        </Link>
                    </Grid>

                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.title } </Typography>
                            <Typography variant='body1'>Talla <strong>M</strong> </Typography>

                            {/* Condicional */}
                            {
                                editable
                                ? <ItemCounter />
                                : <Typography variant='h5'>3 Items</Typography>
                            }
                            
                        </Box>

                    </Grid>

                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>

                        <Typography variant='subtitle1'>{ `$${ product.price }` } </Typography>

                        {/* Editable */}
                        {
                            editable && (
                                <Button variant='text' color='secondary'>
                                    Remover
                                </Button>
                            )
                            
                        }
                    </Grid>

                </Grid>
            ))
        }
    </>
  )
}
