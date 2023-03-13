const express = require('express')

const router = express.Router()

const usercontroller = require('../controllers/userController')
const admincontroller= require('../controllers/adminController')
const productcontroller=require('../controllers/productController')
const auth = require('../middlewares/adminauth')






router.post('/createuser',usercontroller.createUser)
router.post('/loginuser',usercontroller.loginUser)
router.get('/getusers/:adminId',auth.adminAuthentication,auth.adminAuthorization,usercontroller.getListofUsers)
router.get('/getuser/:userId/:adminId',auth.adminAuthentication,auth.adminAuthorization,usercontroller.getUserbyId)
router.post('/createadmin',admincontroller.createAdmin)
router.post('/loginadmin',admincontroller.loginAdmin)
router.post('/createproduct/:adminId',auth.adminAuthentication,auth.adminAuthorization,productcontroller.createProduct)
router.get('/product/:productId',productcontroller.getProductsById)
router.get('/getproducts',productcontroller.getProductsdetails)
router.put('/updateproduct/:productId/:adminId',auth.adminAuthentication,auth.adminAuthorization,productcontroller.updateProductDetails)
router.delete('/deleteproduct/:productId/:adminId',auth.adminAuthentication,auth.adminAuthorization,productcontroller.deleteProduct)

module.exports = router