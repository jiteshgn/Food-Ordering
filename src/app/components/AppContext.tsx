"use client";

import { SessionProvider} from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext=createContext<any>(null);

export function cartProductPrice(cartProduct:any){
    let price=cartProduct.basePrice;
    if(cartProduct.size){
        price +=cartProduct.size.price;
    }
    if(cartProduct.extras?.length > 0){
        for(const extra of cartProduct.extras){
            price+=extra.price;
        }
    }
    return price;
}

export function AppProvider({children}:any){
    const [cartProducts,setCartProducts]=useState<any[]>([])
    const ls=typeof window!=='undefined' ? window.localStorage : null;

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart') || '{}'));
        }
    },[]);

    function clearCart(){
        setCartProducts([]);
        saveCartProductsToLocalStorage([])
    }
    function removeCartProduct(indexToRemove:any){
        setCartProducts((prevCartProducts:any)=>{
            const newCartProducts=prevCartProducts.filter((v:any,index:any)=>index!==indexToRemove)
            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts;
        })
        toast.success('Product removed')
    }

    function saveCartProductsToLocalStorage(cartProducts:any){        
        if(ls){
            ls.setItem('cart',JSON.stringify(cartProducts));
        }
    }
    function addToCart(product:any,size=null,extras=[]){
        setCartProducts((prevProducts)=>{
            const cartProduct={...product,size,extras};
            const newProducts=[...prevProducts,cartProduct];
            saveCartProductsToLocalStorage(newProducts)
            return newProducts;
        })
    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,setCartProducts,
                addToCart,removeCartProduct,clearCart
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}