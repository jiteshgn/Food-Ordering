"use client";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/AppContext";
import Image from "next/image";
import Trash from "../components/icons/Trash";
import AddressInputs from "../components/layout/AddressInputs";
import { useProfile } from "../components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "../components/menu/CartProduct";

export default function CartPage(){
    const {cartProducts,removeCartProduct}=useContext(CartContext);
    const [address,setAddress]=useState({})
    const {data:profileData}=useProfile();

    useEffect(()=>{
        if(typeof window!=='undefined'){
            if(window.location.href.includes('canceled=1')){
                toast.error('Payment failed 😔');
            }
        }
    },[])

    useEffect(()=>{
        if(profileData?.city){
            const {phone,streetAddress,city,postalCode,country}=profileData;
            const addressFromProfile={phone,streetAddress,city,postalCode,country}
            setAddress(addressFromProfile)
        }
    },[profileData])

    let subtotal=0;
    for(const p of cartProducts){
        subtotal+=cartProductPrice(p);
    }
    function handleAddressChange(propName:any,value:any){
        setAddress(prevAddress=>{
            ({...prevAddress,[propName]:value})
        })
    }
    async function proceedToCheckout(ev:any){
        ev.preventDefault();
        //address and shopping cart products

        const promise=new Promise((resolve,reject)=>{
            fetch('/api/checkout',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    address, cartProducts
                })
            }).then(async response=>{
                if(response.ok){
                    resolve('');
                    window.location=await response.json();
                }else{
                    reject();
                }
            });            
        });
        toast.promise(promise,{
            loading: 'Preparing your order...',
            success: 'Redirecting to payment',
            error: 'Something went wrong... Please try again later'
        })
        //redirect to stripe
    }
    if(cartProductPrice?.length===0){
        return (
            <section className="mt-8 text-center">
                <SectionHeaders subHeader='' mainHeader="Cart">
                    <p className="mt-4">Your shopping cart is empty 😔</p>
                </SectionHeaders>
            </section>
        )
    }
    return(
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders subHeader="" mainHeader="Cart"/>
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>{cartProducts?.length===0 &&(
                    <div>No products in your shopping cart</div>
                )}
                {cartProducts?.length>0 && cartProducts.map((product:any,index:any)=>(
                    <CartProduct key={index} product={product} index={index} onRemove={removeCartProduct}/>
                ))}
                <div className="py-2 pr-16 flex justify-end items-center">
                    <div className="text-gray-500">
                        Subtotal:<br/>
                        Delivery:<br/>
                        Total:
                    </div> 
                    <div className="font-semibold pl-2text-right">
                        ${subtotal}<br/>
                        $5<br/>
                        ${subtotal+5}
                    </div>
                </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs addressProp={address} setAddress={handleAddressChange}/>
                        <button type="submit">Pay ${subtotal+5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}