import React from 'react'
import { server } from '../../config';
import { useSelector } from 'react-redux';

const useDeleteProduct = () => {
    const user = useSelector((store) => store.auth.user);

    const deleteproduct = async () => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',

            }

            const response = await fetch(`${server}/api/order/${user._id}`, requestOptions);
            const data = await response.json();

        } catch (error) {
            console.log("Error saving product:", error);
        }
    }
    return [deleteproduct]
}

export default useDeleteProduct;