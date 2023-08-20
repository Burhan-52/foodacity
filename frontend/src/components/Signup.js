import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authFailure, authStart, authSuccess } from '../utils/store/authSlice';
import '../../Style/signup.css'
import { convertToBase64 } from '../utils/helper';
import { server } from '../../config';

const Signup = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const [usersignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(authStart())
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: usersignup.name,
                    email: usersignup.email,
                    password: usersignup.password,
                    img: selectedImage && selectedImage.myFile
                }),
            }

            const response = await fetch(`${server}/api/signup`, requestOptions)
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                dispatch(authSuccess(data.newUser))
                navigate("/")

            } else {
                toast.error(data.error);
            }

        } catch (error) {
            toast.error(error.message)
            dispatch(authFailure(error.message))
        }

    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setSelectedImage({ myFile: base64 })
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="mb-4">
                    <label htmlFor="Name" className="block mb-2 font-bold">
                        Name:
                    </label>
                    <input
                        type="text"
                        value={usersignup.name}
                        onChange={(e) => setUserSignup({ ...usersignup, name: e.target.value })}
                        required
                        className="form-input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-bold">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={usersignup.email}
                        onChange={(e) => setUserSignup({ ...usersignup, email: e.target.value })}
                        required
                        className="form-input"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-bold">
                        Password:
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type='password'
                            value={usersignup.password}
                            onChange={(e) => setUserSignup({ ...usersignup, password: e.target.value })}
                            required
                            className="form-input"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="profile-image" className="block mb-2 font-bold">
                        Profile Image:
                    </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">
                    Sign Up
                </button>
                <p className="signin-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>

        </div>
    );
};

export default Signup;
