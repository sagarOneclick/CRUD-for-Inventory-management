const express = require('express')
const {Products} = require('../models/products.model')
const {Categories} = require('../models/categories.model')

const productsRouter = express.Router()

productsRouter.get('/', (req, res) => {
    return res.send({msg: "hello from products router"})
})


productsRouter.get('/:name', async (req, res) => {
    const name = req.params.name;

    // Query the products collection based on the name
    const foundProduct = await Products.find({ name });

    // If no products are found
    if (foundProduct.length === 0) {
        return res.status(404).send({ msg: "No product found" });
    } else {
        // Return the found products
        res.json({ foundProduct });
    }
});


productsRouter.post('/', async (req, res) => {
    const { name, description, price, quantity} = req.body;
    let {category_id }= req.body;
    if (!name || !description || !price || !quantity || !category_id) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
    const category = await Categories.findOne({category_id});
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        category_id = category._id;
        const newProduct = new Products({
            name,
            description,
            price,
            quantity,
            category_id,
        });
        await newProduct.save();

        return res.status(201).json({ msg: "New product created successfully", product: newProduct });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error creating product" });
    }
});
module.exports={
    productsRouter
}