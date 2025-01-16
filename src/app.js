const express =require('express')
const mongoose = require('mongoose')
const {productsRouter} = require('./routes/products.router')
const {categoriesRouter} = require('./routes/categories.router')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/products',productsRouter)
app.use('/categories',categoriesRouter)
app.get('/*',(req,res)=>{
    res.send({msg:"helo from ims"})
})

mongoose.connect("mongodb://localhost:27017/Inventory_crud_api", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));
module.exports={
    app
}