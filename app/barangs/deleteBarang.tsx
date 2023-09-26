'use client'

import {SyntheticEvent, useState} from "react";
import { useRouter } from "next/navigation";

type Barang = {
    id : number ; 
    namaBarang: string ;
    stokBarang: number ;
    Harga : number ;

}


export default function DeleteBarang(barang: Barang) {

const [modal, setModal] = useState(false);
const [isMutating, setIsMutating] = useState(false);

const router = useRouter();


async function handleDelete(barangId: number){

    setIsMutating(true);
    await fetch(`http://localhost:5000/barang/${barangId}`,{
        method: 'DELETE',
    
    });

    setIsMutating(false);

    
    router.refresh();
    setModal(false);
}


    function handleChange(){
        setModal(!modal);
    }


    return ( 
    <div>
<button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
<input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>


        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg"> Are u sure to delete {barang.namaBarang}? </h3>
                <div className="modal-action">
                        <button type="button" onClick={handleChange} className="btn">Close</button>
                        {!isMutating ? (
                            <button type="button" onClick={()=> handleDelete(barang.id)} className="btn btn-primary">Delete</button>
                        ):(
                            <button type="button" className="btn loading">Deleting ....</button>
                        )}
                        
                        
                    </div>
            </div>
        </div>
    </div>
  )
}
