'use client'

import {SyntheticEvent, useState} from "react";
import { useRouter } from "next/navigation";


export default function AddBarang() {
const [namaBarang, setnamaBarang] = useState("");
const [stokBarang, setstokBarang] = useState("");
const [Harga, setHarga] = useState("");
const [modal, setModal] = useState(false);
const [isMutating, setIsMutating] = useState(false);

const router = useRouter();


async function handleSubmit(e:SyntheticEvent){
    e.preventDefault();
    setIsMutating(true);
    await fetch('http://localhost:5000/barang',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            namaBarang:namaBarang,
            stokBarang:stokBarang,
            Harga:Harga
        })
    });

    setIsMutating(false);
    setnamaBarang("");
    setstokBarang("");
    setHarga("");
    
    router.refresh();
    setModal(false);
}


    function handleChange(){
        setModal(!modal);
    }


    return ( 
    <div>
<button className="btn" onClick={handleChange}>Add New</button>
<input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>


        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Barang </h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Nama Barang</label>
                        <input type="text" value={namaBarang} onChange={ (e) => setnamaBarang(e.target.value) }className="input w-full input-bordered" placeholder="namaBarang" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Stok Barang</label>
                        <input type="number" value={stokBarang} onChange={ (e) => setstokBarang(e.target.value) } className="input w-full input-bordered" placeholder="stokBarang" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Harga </label>
                        <input type="number" value={Harga} onChange={(e) => setHarga(e.target.value) } className="input w-full input-bordered" placeholder="Harga" />
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={handleChange} className="btn">Close</button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">Save</button>
                        ):(
                            <button type="button" className="btn loading">Saving ....</button>
                        )}
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
