import { useState } from "react";
import axiosInstance from "../AxiosInstance";

export default function AddUserView() {

  const [addUserForm, setAddUserForm] = useState({
    nama: "",
    email: "",
    password: "",
    nomor_telepon: "",
    status_aktif: false,
    departemen: ""
  });

  const handleAddUserChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAddUserForm((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    });
  }

  const sendAddUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance({
        url: "/user",
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        data: addUserForm
      });

      alert("Berhasil Menambah User");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return ( <>
  
    <div className="flex justify-center">
      <form onSubmit={sendAddUser} className="flex flex-col flex-1/3 p-10">
        <label className="text-xl mb-2">NAMA</label>
        <input name="nama" type="text" onChange={handleAddUserChange} value={addUserForm.nama} placeholder="Budi" className="form-control mb-2"></input>
        <label className="text-xl mb-2">E-MAIL</label>
        <input name="email" type="text" onChange={handleAddUserChange} value={addUserForm.email} placeholder="budi@email.com" className="form-control mb-2"></input>
        <label className="text-xl mb-2">PASSWORD</label>
        <input name="password" type="password" onChange={handleAddUserChange} value={addUserForm.password} placeholder="*****" className="form-control mb-2"></input>
        <label className="text-xl mb-2">NOMOR TELEPON</label>
        <input name="nomor_telepon" type="text" onChange={handleAddUserChange} value={addUserForm.nomor_telepon} placeholder="081234567890" className="form-control mb-2"></input>
        <label className="text-xl mb-2">DEPARTEMEN</label>
        <input name="departemen" type="text" onChange={handleAddUserChange} value={addUserForm.departemen} placeholder="Keuangan" className="form-control mb-2"></input>
        <div className="mb-2">
          <input name="status_aktif" type="checkbox" onChange={handleAddUserChange} checked={addUserForm.status_aktif} placeholder="Status Aktif" className="me-2"></input>
          <label>Status Aktif</label>
        </div>
        <button type="submit" className="button border border-neutral-200 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-800" style={{transition: '0.2s ease'}}>Add</button>
      </form>
    </div>
  
  </> );

}