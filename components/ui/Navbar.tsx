import NextLink from 'next/link';
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



export const Navbar = () => {
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

        <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
          <NextLink href='/category/men' passHref legacyBehavior>
            <Link>
              <Button>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>
            <Link>
              <Button>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref legacyBehavior>
            <Link>
              <Button>Niños</Button>
            </Link>
          </NextLink>
        </Box>
  
        <Box flex={ 1 } />

        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>

        <NextLink href='/cart' passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent= { 2 } color='secondary'>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>
          Menú
        </Button>
      </Toolbar>
    </AppBar>
    
  )
}
