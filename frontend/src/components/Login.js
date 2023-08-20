import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authFailure, authStart, authSuccess } from '../utils/store/authSlice';
import '../../Style/login.css';
import { server } from '../../config';

const Login = () => {
  const [userlogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(authStart())

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: userlogin.email,
          password: userlogin.password
        }),
      }

      const response = await fetch(`${server}/api/login`, requestOptions)
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(authSuccess(data.existingUser))
        navigate("/")
      } else {
        toast.error(data.error);
        dispatch(authFailure(data.error))
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <div>
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={userlogin.email}
              onChange={(e) => setUserLogin({ ...userlogin, email: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <div className="password-input">
              <input
                type="password"
                id="password"
                value={userlogin.password}
                onChange={(e) => setUserLogin({ ...userlogin, password: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

    </div>
  );
}

export default Login;
