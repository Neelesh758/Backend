import { deleteCart, postCart, updateCart } from "../Controllers/products.controller.js";

export function cartRoutes(app){
     app.post("/api/cart",postCart)
     app.put("/api/cart/:id",updateCart)
     app.delete("/api/deletecart/:id",deleteCart)
}