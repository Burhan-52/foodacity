import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { server } from '../../config';
import { useSelector } from 'react-redux';

const AddressForm = ({ setGetAddressData, getAddress }) => {

    const user = useSelector((store) => store.auth.user);

    const [useraddress, setUserAddress] = useState({
        address: '',
        city: '',
        pincode: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    address: useraddress.address,
                    city: useraddress.city,
                    pincode: useraddress.pincode,
                }),
            };

            const response = await fetch(`${server}/api/address/${user._id}`, requestOptions);
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                setGetAddressData(true)
                getAddress();

            } else {
                toast.error(data.error);
            }

            setUserAddress({
                address: '',
                city: '',
                pincode: '',
            });

        } catch (error) {
            console.log(error);
        }
    };
    return (

        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="address" className="form-label">
                    Address:
                </label>
                <input
                    type="text"
                    id="address"
                    value={useraddress.address}
                    onChange={(e) => setUserAddress({ ...useraddress, address: e.target.value })}
                    required
                    className="input-field"
                />
            </div>
            <div className="form-group">
                <label htmlFor="city" className="form-label">
                    City:
                </label>
                <div className="password-input">
                    <input
                        type="text"
                        id="city"
                        value={useraddress.city}
                        onChange={(e) => setUserAddress({ ...useraddress, city: e.target.value })}
                        required
                        className="input-field"
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="pincode" className="form-label">
                    Pincode:
                </label>
                <div className="password-input">
                    <input
                        type="number"
                        id="pincode"
                        value={useraddress.pincode}
                        onChange={(e) => setUserAddress({ ...useraddress, pincode: e.target.value })}
                        required
                        className="input-field"
                    />
                </div>
            </div>
            <button type="submit" className="submit-button">
                Add
            </button>
        </form>
    )
}

export default AddressForm