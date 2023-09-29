import React, { useEffect, useState } from 'react';
import Logo from "../assests/food.png";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../Style/header.css';
import { toast } from 'react-hot-toast';
import { authSuccess, logout } from '../utils/store/authSlice';
import { emptyCart } from '../utils/store/cartSlice';

const Title = () => {
  return <img data-testid="logo" className="title-img" src={Logo} alt="Logo" />;
};

const Headercomponenet = () => {

  const cartitem = useSelector((store) => store.cart.items);

  const userStore = useSelector((store) => store.auth.user);
  
  const token = localStorage.getItem("authToken")

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleLogout = (e) => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    toast.success("logout Successfully");
    dispatch(emptyCart())
    dispatch(logout())
    navigate("/")

  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!userStore) {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(authSuccess(user))
    }
  }, [dispatch, userStore])

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
            {token ? (

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
