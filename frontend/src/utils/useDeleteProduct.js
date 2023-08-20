import React from 'react'
import { server } from '../../config';

const useDeleteProduct = () => {

    const deleteproduct = async () => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',

            }

            const response = await fetch(`${server}/api/order`, requestOptions);
            const data = await response.json();

        } catch (error) {
            console.log("Error saving product:", error);
        }
    }
    return [deleteproduct]
}

export default useDeleteProduct;