import AddBarang from "./addBarang";
import DeleteBarang from "./deleteBarang";
import UpdateBarang from "./updateBarang";



type Barang = {
    id : number ; 
    namaBarang: string ;
    stokBarang: number ;
    Harga : number ;

}
//menampilkan data 
async function getBarang() {
    const res = await fetch('http://localhost:5000/barang',{cache: 'no-store'
})
    return res.json();
    
}
export default async function ListBarang() {
  const barang: Barang[] = await getBarang();
    return (
    <div className="py-10 px-10">
        <div className="py-2">
            <AddBarang/>
   
        </div>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama Barang</th>
                    <th>Stok Barang</th>
                    <th>Harga</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody> {barang.map((barang, index) => (
                <tr key={barang.id}>
                    <td> {index + 1}  </td>
                    <td>{ barang.namaBarang} </td>
                    <td>{barang.stokBarang}</td>
                    <td>{barang.Harga}</td>
                    <td className="flex">
                        <DeleteBarang {...barang}/>
                        <UpdateBarang {...barang}/>
                        </td>
                </tr>
                ))}
            </tbody>
         
    
         </table>
         </div>
  )
}
