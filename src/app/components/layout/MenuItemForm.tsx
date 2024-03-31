import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit,menuItem}:any){
    const [image,setImage]=useState(menuItem?.image || '');
    const [name,setName]=useState(menuItem?.name || '');
    const [description,setDescription]=useState(menuItem?.description || '');
    const [basePrice,setBasePrice]=useState(menuItem?.basePrice || '');
    // const [sizes,setSizes]=useState<any[]>([{name:'abc',price:15}])
    const [sizes,setSizes]=useState(menuItem?.sizes || null as any)
    const [extraIngredientPrices,setExtraIngredientPrices]=useState(menuItem?.extraIngredientPrices || [])
    const [category,setCategory]=useState(menuItem?.category || '')
    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories)
            })
        })
    },[]);

    return (
    <form onSubmit={ev=>onSubmit(ev,{image,name,description,basePrice,sizes,extraIngredientPrices,category})} className="mt-8 max-w-2xl mx-auto">
                <div className="md:grid items-start gap-4" style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text" value={name} onChange={ev=>setName(ev.target.value)}/>
                        <label>Description</label>
                        <input type="text" value={description} onChange={ev=>setDescription(ev.target.value)}/>
                        <label>Category</label>
                        <select value={category} onChange={ev=>setCategory(ev.target.value)}>{categories?.length > 0 && categories.map((c:any)=>(
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                            </select>
                        <label>Base price</label>
                        <input type="text" value={basePrice} onChange={ev=>setBasePrice(ev.target.value)}/>
                        <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes} />
                        <MenuItemPriceProps name={'Extra ingredients'} addLabel={'Add ingredients prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices}/>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
    )
}