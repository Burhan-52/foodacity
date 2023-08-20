import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { instance } from "../index.js";
import { Payment } from "../model/Payment.js";
import crypto from "crypto";

const router = express.Router()
router.post('/payment', isAuthenticated, async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing the payment.",
        });
    }
});

router.post('/paymentverify', isAuthenticated, async (req, res) => {
  
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `https://foodacity-backend.onrender.com/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }

})

router.get("/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

export default router