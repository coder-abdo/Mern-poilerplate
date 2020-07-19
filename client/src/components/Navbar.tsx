import React from "react";
import { NavLink, Link } from "react-router-dom";
export const Navbar: React.FunctionComponent<{
  handleLogout: () => void;
  isAuth: boolean;
}> = ({ handleLogout, isAuth }) => {
  const guestNavLinks = (
    <>
      <li className="nav-item mr-3">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );
  const userLinks = (
    <>
      <li className="nav-item mr-3">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <button className="btn btn-primary btn-lg" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand text-success">
        Me
      </Link>
      <ul className="navbar-nav ml-auto d-flex align-items-center">
        {isAuth ? userLinks : guestNavLinks}
      </ul>
    </nav>
  );
};
