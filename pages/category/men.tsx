import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layout";

import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";





const MenPage = () => {
    
  const { products, isLoading } = useProducts('/products?gender=men'); 

  return (
    <ShopLayout title={"Teslo-Shop - Men"} pageDescription={"Encuentra los mejores productos de Teslo para hombres"} >
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

export default MenPage;