import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { deleteitem } from '../utils/store/cartSlice'
import { server } from '../../config'
import { useDispatch } from 'react-redux'

const PaymentSuccess = () => {

    const dispatch = useDispatch()

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"));

    const deleteProducts = async () => {
        try {

            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }

            const response = await fetch(`${server}/api/order/${user.existingUser._id}`, requestOptions)
            const data = await response.json();
            console.log(data)

            if (data.success) {
                dispatch(deleteitem())
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!(localStorage.getItem("authToken"))) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        deleteProducts()
    }, [])

    return (
        <div>
            Reference No.{referenceNum}
            <div>Deliverd in {"30 MIN"}</div>
            <Link to={"/"}> <button>go to page</button></Link>

        </div>
    )
}

export default PaymentSuccess