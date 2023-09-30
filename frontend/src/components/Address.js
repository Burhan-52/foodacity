import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePayment from '../utils/usePayment';
import AddressForm from './AddressForm';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../../config';

const Address = () => {

    const auth = useSelector((store) => store.auth.isauth);

    const carttotalcount = useSelector((store) => store.cart.totalItemsCount);

    const user = useSelector((store) => store.auth.user);

    const [checkoutHandler] = usePayment(carttotalcount)

    const [getaddress, setGetAddress] = useState([]);
    console.log(getaddress)

    const [deliver, setDeliver] = useState(false)

    const [getaddressdata, setGetAddressData] = useState(false)

    const navigate = useNavigate()

    // const [getAddress, setGetAddressData, getaddress] = useGetAddress()

    const getAddress = useCallback(async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            };

            const response = await fetch(`${server}/api/address/${user._id}`, requestOptions);
            const data = await response.json();
            const addresses = data.address && Array.isArray(data.address) ? data.address : [];
            setGetAddress(addresses);

        } catch (error) {
            console.log('Error fetching address data:', error.message);
        }
    }, [getaddressdata]);

    useEffect(() => {
        getAddress();
    }, []);

    if (!auth) {
        return navigate('/login')
    }

    return (
        <div>
            {getaddress.length > 0 ? ( // Conditionally render the form or existing address
                <div>
                    <h4>Delivery address</h4>
                    <div>Home</div>

                    <div> {`${getaddress[0].address},${getaddress[0].city},${getaddress[0].pincode}`}</div>
                    <button className="cart-btn margin" onClick={() => setDeliver(prev => !prev)}>Deliver Here {deliver ? "✔" : ""}</button>
                    {deliver && <span >change</span>}
                    <div>
                        <Link to={'/payment'}>
                            <button className="cart-btn margin" disabled={!deliver} onClick={() => checkoutHandler(carttotalcount)}>proceed to payment</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <AddressForm setGetAddressData={setGetAddressData} getAddress={getAddress} />

            )}
        </div>
    );
};

export default Address;


