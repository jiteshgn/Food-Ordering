import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import { useEffect,useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({name,addLabel,props,setProps}:any){

    const [isOpen,setIsOpen]=useState(false);

    function addProp(){
        setProps((oldProps:any)=>{
            return [...oldProps,{name:'',price:0}]
        })
    }
    function editProp(ev:any,index:number,prop:any){
        const newValue=ev.target.value;
        setProps((prevSizes:any)=>{
            const newSizes=[...prevSizes];
            newSizes[index][prop]=newValue;
            return newSizes;
        })
    }
    function removeProp(indexToRemove:any){
        setProps((prev:any)=>prev.filter((v:any,index:number)=>index!==indexToRemove))
    }
    // useEffect(()=>{
    //     setProps([{name:'abc',price:15}]);
    // },[])
    return (        
        <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button onClick={()=>setIsOpen(prev=>!prev)} className="inline-flex p-1 border-0 justify-start" type="button">
            {isOpen && ( <ChevronUp/>)}
            {!isOpen && ( <ChevronDown/>)}
        <span>{name}</span>
        <span>({props?.length})</span></button>
        <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length>0 && props.map((size:any,index:any)=>(
            <div key={index} className="flex items-end gap-2">
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="Size name" value={size.name} onChange={ev=>editProp(ev,index,'name')}/>
                </div>
                <div>
                    <label>Extra price</label>
                    <input type="text" placeholder="Extra price" value={size.price} onChange={ev=>editProp(ev,index,'price')}/>
                </div>
                <div>
                    <button onClick={()=>removeProp(index)} type="button" className="bg-white mb-2 px-2"><Trash/></button>
                </div>
            </div>
        ))}
        <button type="button" onClick={addProp} className="bg-white items-center"><Plus className="w-4 h-4"/><span>{addLabel}</span></button>
        </div>
    </div>
    )
}