import { useEffect, useState } from "react";

export function useProfile(){
    const [data,setData]=useState<{[key: string]: any}>({});
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        setLoading(true)
        fetch('/api/profile').then(response=>{
            response.json().then(data=>{
                setData(data)
                setLoading(false)
            });
        });
    },[]);

    return {loading, data}
}