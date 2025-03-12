import { createProducts, fetchProducts, fetchsingleproduct } from "../Controllers/products.controller.js";

export function routes(app){
    app.post("/api/products",createProducts);
    app.get("/api/products",fetchProducts);
    app.get("/api/product/:id",fetchsingleproduct)
}