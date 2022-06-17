import express from 'express'
import {getProducts, getProduct, deleteProduct, createProduct, updateProduct,createReview} 
from '../controllers/productController.js'
import { protect, admin } from '../middleware/authHandler.js'


const router = express.Router()

router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router
    .route('/:id')
    .get(getProduct)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)


router
    .route('/:id/review')
    .post(protect, createReview)



    



export default router