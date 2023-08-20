import React, { useState } from 'react';
import Logo from "../assests/food.png";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/header.css';
import { toast } from 'react-hot-toast';
import { authFailure, logout } from '../utils/store/authSlice';
import { additem, emptyCart } from '../utils/store/cartSlice';
import { server } from '../../config';

const Title = () => {
  return <img data-testid="logo" className="title-img" src={Logo} alt="Logo" />;
};

const Headercomponenet = () => {

  const cartitem = useSelector((store) => store.cart.items);

  const auth = useSelector((store) => store.auth.isauth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleLogout = async (e) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      };

      const response = await fetch(`${server}/api/logout`, requestOptions);
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        dispatch(emptyCart())
        dispatch(logout())
        navigate("/")

      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      dispatch(authFailure(error))
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container">
      <Title />
      <div className={`nav-item-container ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-item">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/cart">Cart {Object.values(cartitem).length}</Link>
            </li>
          </ul>
          <div className="login-btn">
            {auth ? (
             
                <button onClick={handleLogout} className="log">
                  Logout
                </button>
             
            ) : (
              <Link to="/login">
                <button data-testid="login" className="log">
                  Login
                </button>
              </Link>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headercomponenet;
