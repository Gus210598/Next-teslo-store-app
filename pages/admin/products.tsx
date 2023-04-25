import NextLink from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import useSWR from 'swr';

import { AdminLayout } from "@/components/layout"
import { IProduct } from '@/interfaces';
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";


const columns: GridColDef[] = [
  { 
    field     : 'img',     
    headerName: 'Foto', 
    renderCell: ({ row }: GridRenderCellParams ) => {
        return (
            <a href={ `/product/${ row.slug }` } target="_blank" >
                <CardMedia 
                    component='img'
                    alt = { row.title }
                    className='fadeIn'
                    image= { row.img }
                />
            </a>
        )
    }
  },
  { 
    field     : 'title',   
    headerName: 'Title', 
    width     : 250,
    renderCell: ({ row }: GridRenderCellParams ) => {
        return (
            <NextLink href={ `/admin/products/${ row.slug }` } passHref legacyBehavior >
               <Link underline='always'>
                { row.title }
               </Link>
            </NextLink>
        )
    } 
  },
  { field: 'gender',  headerName: 'Género' },
  { field: 'type',    headerName: 'Tipo' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price',   headerName: 'Precio' },
  { field: 'sizes',   headerName: 'Tallas', width: 250 },
  
];

const ProductPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if ( !data && !error ) return (<></>);

  const rows = data!.map( product => ({
    id:     product._id,
    img:    product.images[0],
    title:  product.title,
    gender: product.gender,
    type:   product.type,
    inStock:product.inStock,
    price:  product.price,
    sizes:  product.sizes.join(', '),
    slug:   product.slug,

  }))

  return (  
    <AdminLayout
      title   = {`Productos (${ data?.length })`} 
      subTitle= {"Mantenimiento de productos"}
      icon    = {  <CategoryOutlined/> }
    >
      <Box display='flex' justifyContent='end' sx={{ mb:2 }}>
        <Button
          color='secondary'
          startIcon= { <AddOutlinedIcon /> }
          href='/admin/products/new'
        >
          Crear producto
        </Button>
        
      </Box>
      <Grid container className='fadeIn' >
        <Grid item xs={ 12 } sx={{ height: 650, width:'100%' }}>
            <DataGrid 
                rows={ rows }                    
                columns={ columns } 
                // pageSize= {[25]}
                // rowsPerPageOptions= {[25]}
                autoHeight
                disableRowSelectionOnClick 
            />
        </Grid>
      </Grid>

    </AdminLayout>


  )
}

export default ProductPage
