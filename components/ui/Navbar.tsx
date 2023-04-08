import { useContext, useState } from 'react';

import router, { useRouter } from 'next/router';
import NextLink from 'next/link';

import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography, Badge, Input, InputAdornment } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { CartContext, UiContext } from '@/context';


export const Navbar = () => {

  const { asPath, push } = useRouter();

  const { toggleSideMenu } = useContext(UiContext)
  const { numberOfItem } = useContext(CartContext)


  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState( false );

  const onSearchTerm = () => {
      if ( searchTerm.trim().length === 0 ) return;

      router.push( `/search/${ searchTerm }` );
  }


  return (

    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior >
          <Link display='flex' alignItems='center' >
              <Typography variant='h6' >Teslo |</Typography>
              <Typography sx={{ ml: 0.5 }} >Shop</Typography>
          </Link>
        </NextLink>

        {/*  todo flex */}
        <Box flex={ 1 } />

        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn' >
          <NextLink href='/category/men' passHref legacyBehavior>
            <Link>
              <Button color={ asPath === '/category/men' ?'primary' :'info' }>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>
            <Link>
              <Button color={ asPath === '/category/women' ?'primary' :'info' }>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref legacyBehavior>
            <Link>
              <Button color={ asPath === '/category/kid' ?'primary' :'info' }>Niños</Button>
            </Link>
          </NextLink>
        </Box>
  

        <Box flex={ 1 } />
      
        {/* Para pantllas grandes */}

        {
          isSearchVisible
            ? 
              (
                <Input
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                  className='fadeIn'
                  autoFocus
                  value={ searchTerm }
                  onChange={ (e) => setSearchTerm( e.target.value )}
                  onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() :null }
                  type='text'
                  placeholder="Buscar..."
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                          onClick={ () => setIsSearchVisible( false ) }

                          aria-label="toggle password visibility"
                        >
                          <ClearOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                />
              )
            : 
              (
                <IconButton
                  className='fadeIn'
                  sx={{ display: { xs:'none', sm:'flex' }  }}
                  onClick={ () => setIsSearchVisible( true ) }
                >
                  <SearchOutlinedIcon />
                </IconButton>
              )

        }


        {/* Para pantallas pqeueñas */}
        <IconButton
          className='fadeIn'
          sx={{ display: { xs:'flex', sm:'none' }  }}
          onClick={ toggleSideMenu }
        >
          <SearchOutlinedIcon />
        </IconButton>

        <NextLink href='/cart' passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent= { numberOfItem >9 ? '+9' : numberOfItem } color='secondary'>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={ toggleSideMenu }>
          Menú
        </Button>
      </Toolbar>
    </AppBar>
    
  )
}
