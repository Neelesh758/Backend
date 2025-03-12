import mongoose from "mongoose";
const {Schema} = mongoose;

const cartSchema = new Schema(
    {
        productId:String,
        productQty:String,
    }
)

const cartModel = mongoose.model("carts",cartSchema)
export default cartModel;