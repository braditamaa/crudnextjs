'use client'

import {SyntheticEvent, useState} from "react";
import { useRouter } from "next/navigation";


type Barang = {
    id : number ; 
    namaBarang: string ;
    stokBarang: number ;
    Harga : number ;

}
export default function UpdateBarang(barang: Barang) {
const [namaBarang, setnamaBarang] = useState(barang.namaBarang);
const [stokBarang, setstokBarang] = useState(barang.stokBarang);
const [Harga, setHarga] = useState(barang.Harga);
const [modal, setModal] = useState(false);
const [isMutating, setIsMutating] = useState(false);

const router = useRouter();


async function handleUpdate(e:SyntheticEvent){
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/barang/${barang.id}`,{
        method: 'PATCH',
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
    router.refresh();
    setModal(false);
}


    function handleChange(){
        setModal(!modal);
    }


    return ( 
    <div>
<button className="btn btn-info btn-sm" onClick={handleChange}>   Edit   </button>
<input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>


        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg"> Edit {barang.namaBarang} </h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Nama Barang</label>
                        <input type="text" value={namaBarang} onChange={ (e) => setnamaBarang(e.target.value) } className="input w-full input-bordered" placeholder="namaBarang" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Stok Barang</label>
                        <input type="number" value={stokBarang} onChange={ (e) => setstokBarang(Number(e.target.value)) } className="input w-full input-bordered" placeholder="stokBarang" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Harga </label>
                        <input type="number" value={Harga} onChange={ (e) => setHarga(Number(e.target.value)) } className="input w-full input-bordered" placeholder="Harga" />
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={handleChange} className="btn">Close</button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">Update</button>
                        ):(
                            <button type="button" className="btn loading">Updating ....</button>
                        )}
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
