import cartModel from "../Models/cart.Model.js"
import productsModel from "../Models/products.Model.js"

export function createProducts(req,res){
    const {name,price,description,quantity} = req.body

    const newProduct  =  new productsModel({
        name,
        price,
        description,
        quantity
    })

    newProduct.save().then(data=>{
        if(!data){
            return res.status(404).json({msg:"No Data Found"})
        }
        res.send(data)
    }).catch(err=>res.status(500).json({msg:err.message}))
}

//Fetch products

export function fetchProducts(req,res){
    productsModel.find().then(data=>{
        if(!data){
            return res.status(404).json({message:"Data Not Found"})
        }
        res.send(data)
    }).catch(err=>res.status(500).json({message:err.message}))
}

//fetch single products
export function  fetchsingleproduct(req,res){
    const {id} = req.params;
    productsModel.findById(id).then(data=>{
        if(!data){
            return res.status(404).json({message:"Data Not Found"})
        }
        res.send(data)
    }).catch(err=>res.status(500).json({message:err.message}))
}

//////////Controllers for Cart Items
// export function postCart(req,res){
//     const {productId,productQty} = req.body;

//     productsModel.findById(productId).then(productVal=>{
//         if(!productVal){
//             return res.status(404).json({message:"Product not found in Store"})
//         }
//         if(productVal.quantity<productQty){
//             return res.status(404).json({message:"Stock Not available"})
//         }         
//     })
    
//     const cartItem = new cartModel({productId,productQty})
//     cartItem.save().then(data=>{
//         if(!data){
//             return res.status(404).json({message:"Invalid"})
//         }
//         res.send(data)
//     }).catch(err=>res.status(500).json({message:err.message}))                                                                                                                                                
// }
export function postCart(req, res) {
    const { productId, productQty } = req.body;

    productsModel.findById(productId)
        .then(productVal => {
            if (!productVal) {
                return res.status(404).json({ message: "Product not found in Store" });
            }

            if (productVal.quantity < productQty) {
                return res.status(400).json({ message: "Stock Not available" });
            }

            // Create cart item only if product exists & stock is available
            const cartItem = new cartModel({ productId, productQty });
            return cartItem.save();
        })
        .then(data => {
            if (!data) {
                return res.status(400).json({ message: "Invalid request" });
            }
            res.status(201).json(data);
        })
        .catch(err => res.status(500).json({ message: err.message }));
}


export function updateCart(req, res) {
    const { productQty } = req.body;

    cartModel.findByIdAndUpdate(req.params.id, { productQty }, { new: true })
        .then(cartItem => {
            if (!cartItem) {
                return res.status(404).json({ message: "Cart item not found" });
            }
            res.json(cartItem);
        })
        .catch(error => {
            res.status(500).json({ message: "Error updating cart item", error: error.message });
        });
}

//Delete 

export function deleteCart(req,res){
    const { id } = req.params;
    cartModel.findByIdAndDelete(id).then(data=>{
        if(!data){
            return res.status(404).json({message:"Invalid"})
        }
        res.json({msg:"Data Deleted Successfully"})
    }).catch(err=>res.status(500).json({message:err.message}))
}