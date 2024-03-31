import { User } from "../../models/User.js";
import mongoose, { ConnectOptions } from "mongoose";
import bcrypt from "bcryptjs";
// const MONGO_URL: string = (process.env.MONGO_URL as string);
export async function POST(req:any){
    const body=await req.json();
    
    const con = await mongoose.connect((process.env.MONGO_URI as string), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    // mongoose.connect(process.env.MONGO_URL);

    const pass=body.password;
    if(!pass?.length || pass.length < 5){
        new Error('password must be at least 5 characters');
    }

    const notHashedPassword=pass;
    const salt=bcrypt.genSaltSync(10);
    body.password=bcrypt.hashSync(notHashedPassword,salt);

    const createdUser=await User.create(body)
    return Response.json(createdUser)
}