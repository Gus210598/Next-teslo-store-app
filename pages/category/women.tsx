import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layout";

import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";



export default function HomePage() {

  const { products, isLoading } = useProducts('/products?gender=women'); 

  return (
    <ShopLayout title={"Teslo-Shop - Women"} pageDescription={"Encuentra los mejores productos de Teslo para mujeres"} >
        <Typography variant="h1" component='h1'>Tienda</Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
        
        {
          isLoading
          ? <FullScreenLoading />  
          : <ProductList products={ products } />
        }

        
    </ShopLayout>
  )
}