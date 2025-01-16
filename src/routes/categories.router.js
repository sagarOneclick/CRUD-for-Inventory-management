const express = require('express');
const { Categories } = require('../models/categories.model');
const categoriesRouter = express.Router();
let id = 1;

categoriesRouter.get('/', (req, res) => {
    return res.send({ msg: "Welcome to categories router" });
});

categoriesRouter.get('/getAllCategories', async (req, res) => {
    try {
        const allCategories = await Categories.find({});
        return res.json(allCategories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error retrieving categories" });
    }
});

categoriesRouter.delete('/:id', async (req, res) => {
    const categoryId = Number(req.params.id);  
    
   
    if (isNaN(categoryId)) {
        return res.status(400).json({ msg: "Invalid category ID format" });
    }

    try {
        
        console.log('Deleting category with ID:', categoryId);
        
        
        const category = await Categories.findOne({ category_id: categoryId });
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }

        
        const deletedCategory = await Categories.deleteOne({ category_id: categoryId });

        
        if (deletedCategory.deletedCount === 0) {
            return res.status(404).json({ msg: "Category not found" });
        }

        return res.json({ msg: "Category deleted successfully" });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ msg: "Error deleting category" });
    }
});


categoriesRouter.post('/', async (req, res) => {
    const { category_name } = req.body;
    try {
        // Check if the category already exists
        const existingCategory = await Categories.findOne({ category_name });
        if (existingCategory) {
            return res.status(400).json({ msg: "Category already exists" });
        }

        // Increment the category_id dynamically
        const newCategory = new Categories({
            category_id: id++, // Increment the id for new category
            category_name
        });

        await newCategory.save();
        return res.status(201).json({ msg: `New category ${category_name} added successfully` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error adding category" });
    }
});

// 
categoriesRouter.put('/',async (req,res)=>{
    const { category_name,category_id } = req.body;


})

module.exports = {
    categoriesRouter
};
