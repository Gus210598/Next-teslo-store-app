import NextLink from 'next/link';

import { Typography, Grid, Link, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';


import { ShopLayout } from '../../components/layout/ShopLayout';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si esta pagada la la orden o no',
        width: 200,
        sortable: false,
        renderCell: ( params: GridRenderCellParams ) => {
            return (
                params.row.paid
                ? <Chip color='success' label="Pagada" variant='outlined' />
                : <Chip color='error' label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: ( params: GridRenderCellParams ) => {
            return (
                <NextLink href={`/orders/${ params.row.id }`} passHref legacyBehavior >
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
                
            )
        }
    },
]

const rows = [
    { id: 1, paid: true, fullname: 'Jannifer Aparicio' },
    { id: 2, paid: false, fullname: 'Robin Peredo' },
    { id: 3, paid: true, fullname: 'Cinthya Barahona' },
    { id: 4, paid: false, fullname: 'Karina Vilo' },
    { id: 5, paid: true, fullname: 'Sebastian Peredo' },
    { id: 6, paid: true, fullname: 'Yair Tolosa' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription={'Historial de ordenes del cliente'}  >
        <Typography variant='h1' component='h1' >Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={ 12 } sx={{ height: 650, width:'100%' }}>
                <DataGrid 
                    rows={ rows }                    
                    columns={ columns } 
                    // pageSize= {10}
                    // rowsPerPageOptions= {[10]}
                    autoHeight
                    disableRowSelectionOnClick 
                />
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage
