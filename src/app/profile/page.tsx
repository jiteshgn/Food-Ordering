"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
// import InfoBox from "../components/layout/InfoBox";
// import SuccessBox from "../components/SuccessBox";
import toast from "react-hot-toast";
import UserTabs from "../components/layout/UserTabs";
import EditableImage from "../components/layout/EditableImage";
import UserForm from "../components/layout/UserForm";

export default function ProfilePage(){

const session=useSession();
const [user,setUser]=useState(null)
const [isAdmin,setIsAdmin]=useState(false);
const [profileFetched,setProfileFetched]=useState(false)
// const [saved,setSaved]=useState(false)
// const [isSaving,setIsSaving]=useState(false)
// const [isUploading,setIsUploading]=useState(false)
const {status}=session;
// console.log(session)

useEffect(()=>{
    fetch('/api/profile').then(response=>{
        response.json().then(data=>{
            setUser(data)
            console.log(data)
            setIsAdmin(data.admin);
            setProfileFetched(true);
        })
    })
},[session,status])

async function handleProfileInfoUpdate(ev:any,data:any){
    ev.preventDefault();
    // setSaved(false)
    // toast('Saving...')
    // setIsSaving(true)
    const savingPromise=new Promise(async(resolve,reject)=>{
        const response=await fetch('/api/profile',{
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(data)
        });
        // setIsSaving(false)
        if(response.ok){
            resolve('')
            // setSaved(true)
            // toast.success('Profile saved!')
        }else{
            reject()
        }
    })
    await toast.promise(savingPromise,{
        loading:'Saving...',
        success:'Profile saved!',
        error: 'Error'
    })
}
const email=session.data?.user?.email?session.data?.user?.email:''
if(status==='loading' || !profileFetched){
    return 'Loading...';
}
if(status==='unauthenticated'){
    return redirect('/login');
}

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="max-w-2xl mx-auto mt-8">
                {/* {saved && <SuccessBox>Profile saved</SuccessBox>}
                {isSaving && <InfoBox>Saving...</InfoBox>}
                {isUploading && <InfoBox>Uploading...</InfoBox>} */}
                <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>
        </section>
    )
}