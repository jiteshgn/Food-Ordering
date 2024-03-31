import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../models/Order";
import { authOptions } from "../auth/[...nextauth]/route";
import {MenuItem} from "@/app/models/MenuItem";
const stripe=require('stripe')(process.env.STRIPE_SK)

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);

    const {cartProducts,address}=await req.json();

    const session=await getServerSession(authOptions);
    const userEmail=session?.user?.email;

    const orderDoc=await Order.create({
        userEmail, ...address, cartProducts,paid:false
    })

    const stripeLineItems=[];
    for(const cartProduct of cartProducts){
        const productInfo=await MenuItem.findById(cartProduct._id);
        let productPrice=productInfo.basePrice;        
        if(cartProduct.size){
            const size=productInfo.sizes.find(size=>size._id.toString()===cartProduct.size._id.toString());
            productPrice+=size.price;
        }
        console.log(22,cartProduct)
        if(cartProduct.extras?.length>0){
            for(const cartProductExtraThing of cartProduct.extras){
                const productExtras=productInfo.extraIngredientPrices
                const extraThingInfo=productExtras
                                        .find(extra=>extra._id.toString()===cartProductExtraThing._id.toString());
                productPrice+=extraThingInfo.price;
            }
        }

        const productName=cartProduct.name;

        stripeLineItems.push({
            quantity:1,
            price_data: {
                currency: 'USD',
                product_data:{
                    name:productName,
                },
                unit_amount: productPrice * 100
            }
        })
    }
    // return Response.json(null)

    const URL_TO_CONNECT="http://localhost:3000/";
    const stripeSession=await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email:userEmail,
        success_url:URL_TO_CONNECT + 'orders/'+orderDoc._id.toString()+"?clear-cart=1",//cart?success=1',
        cancel_url:URL_TO_CONNECT + 'cart?canceled=1',
        metadata:{orderId:orderDoc._id.toString()},
        payment_intent_data:{
            metadata:{orderId:orderDoc._id.toString()},
        },
        shipping_options:[
            {
                shipping_rate_data:{
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount:500,currency: 'USD'},

                }
            }
        ]
    })
    return Response.json(stripeSession.url)

}