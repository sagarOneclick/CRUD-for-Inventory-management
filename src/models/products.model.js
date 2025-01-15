const mongoose = require('mongoose')
const Categories = require('./categories.model')

const productsSchema = mongoose.Schema({
    productid:{
        type:Number
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    }

})

const Products = mongoose.model("Products",productsSchema)

module.exports={
    Products
}