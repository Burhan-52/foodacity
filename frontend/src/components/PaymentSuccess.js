import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")

    return (
        <div>
            Reference No.{referenceNum}
            <div>Deliverd in {"30 MIN"}</div>

        </div>
    )
}

export default PaymentSuccess