import { AdminLayout } from '@/components/layout'
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material';
import useSWR from 'swr';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { SummaryTile } from '@/components/admin';
import { DashboardSummaryResponse } from '@/interfaces';


const DashboardPage = () => {

  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000 // 30 segundos
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    
    const interval = setInterval(() => {
      // console.log('Aer')
      setRefreshIn( refreshIn => refreshIn >0 ? refreshIn -1: 30 );
    }, 1000 );
  
    return () => clearInterval( interval )
  }, []);
  

  if ( !error && !data ) {
    return <></>
  }

  if ( error ) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>
  }

  const {  
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlinedIcon /> }
    >
      <Grid container spacing={2}>

        <SummaryTile 
          title={ numberOfOrders } 
          subTitle= 'Ordenes totales'  
          icon={ <CreditCardOutlinedIcon color='secondary' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ paidOrders } 
          subTitle= 'Ordenes pagadas'  
          icon={ <AttachMoneyOutlinedIcon color='success' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ notPaidOrders } 
          subTitle= 'Ordenes pendientes'  
          icon={ <CreditCardOffOutlinedIcon color='error' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ numberOfClients } 
          subTitle= 'Clientes'  
          icon={ <GroupOutlinedIcon color='primary' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ numberOfProducts } 
          subTitle= 'Productos'  
          icon={ <CategoryOutlinedIcon color='warning' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ productsWithNoInventory } 
          subTitle= 'Sin existencias'  
          icon={ <CancelPresentationOutlinedIcon color='error' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ lowInventory } 
          subTitle= 'Bajo inventario'  
          icon={ <ProductionQuantityLimitsOutlinedIcon color='warning' sx={{ fontSize:40 }} /> }
        />

        <SummaryTile 
          title={ refreshIn } 
          subTitle= 'Actualización en'  
          icon={ <AccessTimeOutlinedIcon color='secondary' sx={{ fontSize:40 }} /> }
        />

      </Grid>

    </AdminLayout>
  )
}

export default DashboardPage