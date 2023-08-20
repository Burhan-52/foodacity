import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const auth = useSelector((store) => store.auth);
  const cartitem = useSelector((store) => store.cart.items);
  const navigate = useNavigate();

  if (!auth) {
    navigate('/login');
  }

  return (
    <>
      {Object.keys(cartitem).length === 0 && <div>Cart is empty</div>}
    </>
  );
};

export default Payment;
