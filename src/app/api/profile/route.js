import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfo } from "@/app/models/UserInfo";
import { User } from "@/app/models/User";

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const data=await req.json();
    const {_id,name,image,...otherUserInfo}=data;
    
    let filter={};
    if(_id){      
        filter={_id}  
    }else{
        const session=await getServerSession(authOptions);
        // console.log({session,data})
        const email=session.user.email;
        filter={email}          
    }
    
    const user=await User.findOne(filter);
    await User.updateOne(filter,{name, image});
    await UserInfo.findOneAndUpdate({email:user.email},otherUserInfo,{upsert:true});

    // console.log('name' in data)
    // const update={};
    // if('name' in data){
    //     update.name=data.name;
    // }
    // if('image' in data){
    //     update.image=data.image;
    // }
    // if(Object.keys(update).length>0){ //if using if('name' in data) above
        //update user name
        // await User.updateOne({email},update);
    // }
    return Response.json(true);
}

export async function GET(req){
    mongoose.connect(process.env.MONGO_URL)
    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');

    let filterUser={};
    if(_id){
        filterUser={_id};
    }else{
        const session=await getServerSession(authOptions);
        const email=session?.user?.email;
        if(!email){
            return Response.json({})
        }
        filterUser={email};
    }
    const user=await User.findOne(filterUser).lean();
    const userInfo=await UserInfo.findOne({email:user.email}).lean();
    return Response.json({...user,...userInfo})
}