import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";

export default function UserListView() {

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");
  const [nama, setNama] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editUserForm, setEditUserForm] = useState({
    nama: "",
    email: "",
    nomor_telepon: "",
    status_aktif: false,
    departemen: ""
  });
  const [editID, setEditID] = useState("");

  const clickEditUser = (id, nama, email, nomor_telepon, status_aktif, departemen) => {
    setEditMode(true);
    setEditID(id);
    setEditUserForm({
      nama: nama,
      email: email,
      nomor_telepon: nomor_telepon,
      status_aktif: status_aktif,
      departemen: departemen
    });
  }

  const handleEditUserForm = (event) => {
    const { name, value, type, checked } = event.target;
    setEditUserForm((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    });
  }

  const sendEditUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance({
        url: `/user/${editID}`,
        method: "PUT",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        data: editUserForm
      });

      alert("Update Berhasil");
      setEditMode(false);
      getUserList();
      console.log(editUserForm);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const getUserList = async () => {
    try {
      const response = await axiosInstance({
        url: "/user",
        method: "GET",
        headers: {"Accept": "application/json"}
      });

      setUserList(response.data["data"]);

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const getUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance({
        url: `/user/${nama}`,
        method: "GET",
        headers: {"Accept": "application/json"}
      });

      setUser(response.data["data"]);

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axiosInstance({
        url: `/user/${id}`,
        method: "DELETE",
        headers: {"Accept": "application/json"}
      });

      const filteredList = userList.filter((user) => { return user["id"] !== id });
      setUserList(filteredList);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    setUser("");
  }, [nama]);

  return ( <>
    
    <div className="flex flex-col">
      <form onSubmit={getUser} className="flex flex-col mb-2">
        <input onChange={(event) => {setNama(event.target.value)}} value={nama} className="form-control" placeholder="Cari Nama"></input>
      </form>
      {!editMode && (
        <table className="min-w-full">
          <thead style={{background: 'var(--darker)'}}>
            <tr>
              <th>NAMA</th>
              <th>KONTAK</th>
              <th>DEPARTEMEN</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>

            {!nama && (
              userList && userList.map((usr) => { return (
                <tr key={ usr["id"] } style={{borderBottom: '1px solid var(--secondary)'}}>
                  <td className="font-semibold">{ usr["nama"] }</td>
                  <td>
                    <p>{ usr["email"] }</p>
                    <p>{ usr["nomor_telepon"] }</p>
                  </td>
                  <td>{ usr["departemen"] }</td>
                  <td>{ usr["status_aktif"] ? "Aktif" : "Tidak Aktif" }</td>

                  <td className="flex flex-col justify-center items-center font-semibold">
                    <button onClick={() => clickEditUser(usr["id"], usr["nama"], usr["email"], usr["nomor_telepon"], usr["status_aktif"], usr["departemen"] )} className="text-blue-500 cursor-pointer hover:underline underline-offset-4" style={{color: 'var(--light)'}}>Edit</button>
                    <button onClick={() => { deleteUser(usr["id"]); }} className="text-red-500 cursor-pointer hover:underline underline-offset-4">Hapus</button>
                  </td>
                </tr>
              ); } )
            )}

            {user && nama && (
              user && user.map((usr) => { return (
                <tr key={ usr["id"] } style={{borderBottom: '1px solid var(--secondary)'}}>
                  <td className="font-semibold">{ usr["nama"] }</td>
                  <td>
                    <p>{ usr["email"] }</p>
                    <p>{ usr["nomor_telepon"] }</p>
                  </td>
                  <td>{ usr["departemen"] }</td>
                  <td>{ usr["status_aktif"] ? "Aktif" : "Tidak Aktif" }</td>

                  <td className="flex flex-col justify-center items-center font-semibold">
                    <button onClick={() => clickEditUser(usr["id"], usr["nama"], usr["email"], usr["nomor_telepon"], usr["status_aktif"], usr["departemen"] )} className="text-blue-500 cursor-pointer hover:underline underline-offset-4" style={{color: 'var(--light)'}}>Edit</button>
                    <button onClick={() => { deleteUser(usr["id"]); }} className="text-red-500 cursor-pointer hover:underline underline-offset-4">Hapus</button>
                  </td>
                </tr>
              ); } )
            )}

          </tbody>
        </table>
      )}

      {editMode && (
        <div className="flex justify-center">
          <form onSubmit={sendEditUser} className="flex flex-col flex-1/3 p-10">
            <label className="text-xl mb-2">NAMA</label>
            <input name="nama" type="text" onChange={handleEditUserForm} value={editUserForm.nama} placeholder="Budi" className="form-control mb-2"></input>
            <label className="text-xl mb-2">E-MAIL</label>
            <input name="email" type="text" onChange={handleEditUserForm} value={editUserForm.email} placeholder="budi@email.com" className="form-control mb-2"></input>
            <label className="text-xl mb-2">NOMOR TELEPON</label>
            <input name="nomor_telepon" type="text" onChange={handleEditUserForm} value={editUserForm.nomor_telepon} placeholder="081234567890" className="form-control mb-2"></input>
            <label className="text-xl mb-2">DEPARTEMEN</label>
            <input name="departemen" type="text" onChange={handleEditUserForm} value={editUserForm.departemen} placeholder="Keuangan" className="form-control mb-2"></input>
            <div className="mb-2">
              <input name="status_aktif" type="checkbox" onChange={handleEditUserForm} checked={editUserForm.status_aktif} placeholder="Status Aktif" className="me-2"></input>
              <label>Status Aktif</label>
            </div>
            <div className="flex justify-end">
              <button onClick={() => {setEditMode(false)}} className="button border border-red-500 text-red-500 hover:bg-red-500 hover:text-neutral-800 me-2" style={{transition: '0.2s ease'}}>Cancel</button>
              <button type="submit" className="button border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-neutral-800" style={{transition: '0.2s ease'}}>Edit</button>
            </div>

          </form>
        </div>
      )}

    </div>
  
  </> );

}