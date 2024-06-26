const express = require('express')
const router = express.Router()
const {createCategory, getAllCategory, updateCategory,deleteCategory,getSingleCategory} = require('../controllers/categoryController')
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')


router.route('/categories').get(getAllCategory)


//admin
router.route('/admin/category').post(isAuthenticatedUser,authorizeRoles('admin'), createCategory)
router.route('/admin/category/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateCategory)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteCategory)
                               .get(isAuthenticatedUser, getSingleCategory)



module.exports = router