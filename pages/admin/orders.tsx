import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import useSWR from 'swr';

import { AdminLayout } from "@/components/layout"
import { IOrder, IUser } from '@/interfaces';
import { Chip, Grid } from "@mui/material";

const columns: GridColDef[] = [
  { field: 'id',     headerName: 'Orden ID'       , width:220 },
  { field: 'email',  headerName: 'Correo'         , width:230 },
  { field: 'name',   headerName: 'Nombre completo', width:230 },
  { field: 'total',  headerName: 'Monto total'    , width:120 },
  {
    field     : 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: GridRenderCellParams ) => {
      return row.isPaid 
        ? <Chip variant="outlined" label= "Pagada"    color="success"/>
        : <Chip variant="outlined" label= "Pendiente" color="error"/>
    },
    width:120
  },
  {
    field     : 'check',
    headerName: 'Ver orden',
    renderCell: ( row: GridRenderCellParams ) => {
      return ( 
        <a href={ `/admin/orders/${ row.id }` } target="_blank" >
          Ver orden
        </a>
      )
    }
  },
  { field: 'noProducts', headerName: 'No.Productos', align:'center', width:100 },
  { field: 'createdAt',  headerName: 'Creada en',    width:210 },
];

const OrdersPage = () => {

  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if ( !data && !error ) return (<></>);

  const rows = data!.map( (order) => ({
    id        : order._id,
    email     : (order.user as IUser).email,
    name      : (order.user as IUser ).name,
    total     : order.total,
    isPaid    : order.isPaid,
    noProducts: order.numberOfItems,
    createdAt : order.createdAt,
  }))

  return (
    <AdminLayout
      title   = {"Ordenes"} 
      subTitle= {"Mantenimiento de ordernes"}
      icon    = { <ConfirmationNumberOutlined /> }
      >
       <Grid container className='fadeIn' >
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

    </AdminLayout>


  )
}

export default OrdersPage
