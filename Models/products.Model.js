import mongoose from "mongoose";

const {Schema} = mongoose
const productsSchema =  new Schema(
    {
        name:String,
        price:String,
        description:String,
        quantity:String
    }
)

const productsModel = mongoose.model("Products",productsSchema);
export default productsModel;