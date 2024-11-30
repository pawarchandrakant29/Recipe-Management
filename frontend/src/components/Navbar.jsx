import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Include a separate CSS file for styling

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <h2 className="blog-name">🍴 Foodie Delights</h2>
          <ul className="nav-links">
            <li><NavLink to="/" className="nav-item">Home</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}>
              <NavLink to={!isLogin ? "/myRecipe" : "/"} className="nav-item">My Recipes</NavLink>
            </li>
            <li onClick={() => isLogin && setIsOpen(true)}>
              <NavLink to={!isLogin ? "/favRecipe" : "/"} className="nav-item">Favourites</NavLink>
            </li>
            <li onClick={checkLogin}>
              <p className="login-btn">
                {isLogin ? "Login" : "Logout"} {user?.email ? `(${user?.email})` : ""}
              </p>
            </li>
          </ul>
        </div>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
