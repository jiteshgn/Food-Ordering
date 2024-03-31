"use client";
import DeleteButton from "@/app/components/DeleteButton";
import { useProfile } from "@/app/components/UseProfile";
import Left from "@/app/components/icons/Left";
import EditableImage from "@/app/components/layout/EditableImage";
import MenuItemForm from "@/app/components/layout/MenuItemForm";
import UserTabs from "@/app/components/layout/UserTabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenutItemPage(){
    const {id}=useParams()

    const [menuItem,setMenuItem]=useState(null)
    const {loading,data}=useProfile();
    const [redirectToItems,setRedirectToItems]=useState(false)

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
                const item=items.find((i:any)=>i._id===id);
                setMenuItem(item)
            });
        });
    },[])
    
    async function handleFormSubmit(ev:any,data:any){
        ev.preventDefault();
        data={...data,_id:id};
        const savingPromise=new Promise(async(resolve,reject)=>{        
            const response=await fetch('/api/menu-items',{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'}
            });
            if(response.ok){
                resolve('');
            }else{
                reject();
            }
        });
        await toast.promise(savingPromise,{
            loading:'Saving this tasty item',
            success:'Saved',
            error:'Error'
        });

        setRedirectToItems(true)
    }
    async function handleDeleteClick(){
        const promise=new Promise(async (resolve,reject)=>{
            const res=await fetch('/api/menu-items?_id='+id,{
                method: 'DELETE'
            });
            if(res.ok){
                resolve('')
            }else{
                reject();
            }
        });
        await toast.promise(promise,{
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error'
        });
        setRedirectToItems(true)
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return 'Loading user info...';
    }
    if(!data.admin){
        return 'Not an admin';
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button"><Left/><span>Show all menu items</span></Link>
            </div>     
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>    
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-[62%] ml-auto pl-0">
                    <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick}/>
                </div>
            </div>   
        </section>
    )
}