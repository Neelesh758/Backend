import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { routes } from "./Routes/products.Route.js";
import { cartRoutes } from "./Routes/cart.routes.js";
dotenv.config();
mongoose.connect("mongodb://localhost:27017")
const db = mongoose.connection
db.on("open",()=>{
    console.log("Database Connected Successfully")
})
db.on("error",()=>{
    console.log("Not Connected")
})

const app = express();
app.use(express.json());
routes(app)
cartRoutes(app)
app.listen(process.env.Port,()=>{
    console.log("Server is running on port 3000")
})