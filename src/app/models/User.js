import { Schema, model, models } from "mongoose";

const UserSchema=new Schema({
    name: {type:String},
    email: {type:String, required:true, unique:true },
    password: {type:String },
    image: {type:String},
},{timestamps:true});

// UserSchema.pre('save',(next,...rest)=>{
//     console.log(rest)
//     next();
// })


export const User=models?.User || model('User',UserSchema)