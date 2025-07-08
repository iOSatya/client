import { NavLink } from "react-router";
import "./Header.css";

export default function Header() {

  const navStyle = ({ isActive }) => {
    return isActive ? "nav-button isActive" : "nav-button";
  }

  return ( <>
  
    <nav className="flex justify-center" style={{borderBottom: '1px solid var(--secondary)'}}>
      <NavLink to="/" className={navStyle}>Home</NavLink>
      <NavLink to="/user-list" className={navStyle}>Find User</NavLink>
      <NavLink to="/add-user" className={navStyle}>Add User</NavLink>
    </nav>
  
  </>);

}