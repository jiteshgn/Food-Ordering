import mongoose, { ConnectOptions } from "mongoose";
import NextAuth, { getServerSession } from "next-auth/next";
import bcrypt from "bcryptjs";
// const bcrypt = require('bcryptjs');
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import User from '@/models/User';
import { User } from "../../../models/User.js";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect.tsx";
import { UserInfo } from "@/app/models/UserInfo.js";

export const authOptions={
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    CredentialsProvider({
      name: "Credentials",
      id:'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        console.log({credentials})
        const email=credentials?.email;
        const password=credentials?.password;
        // const {email,password}=credentials;
        //For TS:
        // const con = await mongoose.connect((process.env.MONGO_URI as string), {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        // } as ConnectOptions)
        mongoose.connect(process.env.MONGO_URL);
        const user=await User.findOne({email});
        const passwordOk=user && bcrypt.compareSync(password,user.password);
  
        console.log({password})
  
        if(passwordOk){
          return user;
        }
  
        return null
      }
    })
  ]
  }

export async function isAdmin(){
  const session=await getServerSession(authOptions);
  const userEmail=session?.user?.email;
  if(!userEmail){
    return false;
  }
  const userInfo=await UserInfo.findOne({email:userEmail});
  if(!userInfo){
    return false;
  }
  return userInfo.admin;
}
  
const handler=NextAuth(authOptions)
export {handler as GET,handler as POST}