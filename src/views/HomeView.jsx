export default function HomeView() {
  
  return ( <>
  
    <div className="flex flex-col items-center justify-center text-center" style={{minHeight: '80vh'}}>
      <h1 className="text-5xl font-bold mb-4">Selamat Datang!</h1>
      <p className="text-xl" style={{color: 'var(--secondary)'}}>Ini adalah aplikasi sederhana untuk mengelola pengguna pada database.<br></br>Anda dapat melihat, mencari, menambah, mengedit, dan menghapus pengguna.</p>
    </div>
  
  </> );

}