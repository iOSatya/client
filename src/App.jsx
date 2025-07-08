import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {

  return ( <>

    <div className="font-sans" style={{background: 'var(--dark)', color: 'var(--light)'}}>
      <Header />
      <div className="min-h-screen p-4">
        <Outlet />
      </div>
      
      <Footer />
    </div>

  
  </> );

}