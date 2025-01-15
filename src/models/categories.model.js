const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    category_id:{
        type:Number
    },
    category_name:{
        type:String,
    }

})

const Categories = mongoose.model("categories",categoriesSchema);


module.exports={
    Categories
}