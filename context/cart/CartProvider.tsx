import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '.';
import { ICartProduct } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[];
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;
}

interface Props {
    children: ReactNode;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItem: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}


export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
            
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
            
        }
      
    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ) )
    }, [state.cart])

    useEffect(() => {

        const numberOfItem= state.cart.reduce( ( prev, current ) => current.quantity + prev, 0 );
        const subTotal= state.cart.reduce( ( prev, current ) => ( current.price * current.quantity ) + prev, 0 );
        const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 );

        const orderSumary = {
            numberOfItem,
            subTotal,
            tax: ( subTotal * taxRate ),
            total: (subTotal * taxRate) + subTotal
        }
        dispatch({ type: '[Cart] - Update order summary', payload: orderSumary })
    }, [state.cart])
    

    const addProductToCart = ( product: ICartProduct ) => {
        // * Solución 1
        
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        // * Solución 2

        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size )
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product ]});

        // * Solución 3 y definitiva
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })
        
        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );

        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart',  payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        })

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts })

    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product })
    }

    const removeCartProduct = ( product: ICartProduct ) => {
       
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
    }


    

  return (
    <CartContext.Provider value={{
        ...state,

        // Methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,

    }} >
        { children }
    </CartContext.Provider>
  )
}
