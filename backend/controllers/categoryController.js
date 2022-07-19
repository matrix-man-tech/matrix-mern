import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Create a category
// @route   POST /api/categories/
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  let { category: _category, } = req.body
  _category = _category.toUpperCase()
  
  const category = await Category.findOne({ category: _category })

  if (!category) {
    const newCategory = new Category({
      category: _category,
      
    })
    const createdCategory = await newCategory.save()
    res.status(201).json({ category: createdCategory })
  } 
})

// @desc   Get all categories
// @route  GET /api/categories
// @access Private/Admin
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

// @desc   Update categoy
// @route  PUT /api/categories/:category
// @access Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const categories = await Category.findOneAndUpdate(
    { category: req.params.category },
    
    { new: true }
  )
  if (!categories) return res.status(404).json({ msg: 'Category not found' })
  res.json(categories)
})
