const catchAsyncError = require('../middlewares/catchAsyncError')
const Category = require('../models/categoryModel')
const errorHandler = require('../utils/errorHandler')
const Product = require('../models/productModel')


//Admin:  creating category = api/admin/category
exports.createCategory = catchAsyncError(async (req, res) => {
    const category = await Category.create(req.body)
    try {
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin and users:  get all category = api/categories
exports.getAllCategory = catchAsyncError(async (req, res) => {
    const category = await Category.find()
    try {
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin:  update category = api/admin/category/:id
exports.updateCategory = catchAsyncError(async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return next(new errorHandler("Category not found ", 400))
    }
    try {
        category = await Category.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(201).json({
            success: true,
            category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//Admin : get category by Id =  api/admin/category/:id
exports.getSingleCategory = catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new errorHandler("Product not found ", 400))
    }
    try {
        res.status(201).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})


// Admin: delete category = api/admin/category/:id
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return next(new errorHandler("Category is not found", 404));
        }

        // Find products associated with this category
        const products = await Product.find({ categoryId: req.params.id });

        if (products.length > 0) {
            return res.status(400).json({
                success: false,
                message: `This category has ${products.length} products, so you can't delete it`
            });
        }

        // If no products are associated, delete the category itself
        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
