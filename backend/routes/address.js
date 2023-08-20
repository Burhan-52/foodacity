import express from "express";
import Address from "../model/Address.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post('/address', isAuthenticated, async (req, res) => {
    const { address, city, pincode } = req.body

    const userAddress = await Address.create({
        user: req.user._id,
        address,
        city,
        pincode
    });

    res.json({
        success: true,
        message: "address add successfully",
        userAddress

    })

})

router.get('/address',isAuthenticated, async (req, res) => {
    const  id  = req.user._id;

    try {
        const address = await Address.find({ user: id });

        if (address.length === 0) {
            return res.status(400).json({ success: false, error: 'Address is not found' });
        }

        res.json({
            success: true,
            address
        });
    } catch (error) {
        // Handle any error that might occur during the database query
        console.error('Error fetching address:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});



export default router