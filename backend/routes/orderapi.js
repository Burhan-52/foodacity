import express from "express";
import Product from "../model/Order.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post("/order", isAuthenticated, async (req, res) => {
    const { restaurantname, location, productname, quantity, price, action } = req.body;
    
    try {
        // Check if the user is adding an item from a different restaurant
        const existingItems = await Product.find({ user: req.user._id });
        const differentRestaurant = existingItems.some(item => item.restaurantname !== restaurantname);

        if (differentRestaurant) {
            const clearCart = req.body.clearCart;

            if (clearCart) {
                // Clear the user's cart
                await Product.deleteMany({ user: req.user._id });
            } else {
                // Don't proceed and inform the user about the different restaurant
                return res.json({
                    success: false,
                    message: "Adding items from a different restaurant will clear your cart. Please confirm to proceed.",
                });
            }
        }

        let product = await Product.findOne({ user: req.user._id, productname });

        if (!product) {
            // If the product doesn't exist, create a new entry
           
            product = await Product.create({
                user: req.user._id,
                restaurantname,
                location,
                productname,
                quantity,
                price,
            });
        } else {
            if (action === "add") {
                product.quantity += 1;
            } else if (action === "sub") {
                product.quantity -= 1;
                if (product.quantity <= 0) {
                    // If quantity becomes zero or negative, remove the product from the database
                    await Product.deleteOne({ _id: product._id });
                    return res.json({
                        success: true,
                        message: "product quantity is updated",
                        product: null,
                    });
                }
            }
            await product.save();
        }

        res.json({
            success: true,
            message: "product is added",
            product,
        });
    } catch (error) {
        console.error('Error creating/updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/order', isAuthenticated, async (req, res) => {
    const id = req.user._id;

    try {
        const products = await Product.find({ user: id });

        if (!products || products.length === 0) {
            // Return an empty array with a 200 status code when products are not found
            return res.status(200).json({ success: false, products: [] });
        }

        const productDetails = products.map((product) => ({
            id: product._id,
            restaurantname: product.restaurantname,
            location: product.location,
            productname: product.productname,
            quantity: product.quantity,
            price: product.price,
        }));

        res.json({
            success: true,
            products: productDetails,
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

router.delete("/order", isAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;

        await Product.deleteMany({ user: userId });

        res.json({ success: true, message: "All products deleted successfully." });
    } catch (error) {
        console.error("Error deleting products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router