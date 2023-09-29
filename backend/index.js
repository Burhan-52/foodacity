import express from "express";
import connectToMongo from "./db.js"
import userRouter from "./routes/user.js"
import orderApiRouter from "./routes/orderapi.js"
import addressApiRouter from "./routes/address.js"
import paymentApiRouter from "./routes/payment.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import Razorpay from "razorpay";

const app = express()
config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

connectToMongo()

//Razor configuration 
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

//Middleware 

app.use("/api", userRouter)
app.use("/api", orderApiRouter)
app.use("/api", addressApiRouter)
app.use("/api", paymentApiRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is Running at ${process.env.PORT}`)
})
