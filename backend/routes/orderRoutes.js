import express from 'express'
import {addOrderItems, 
        getOrderById, 
        updateOrderToPaid, 
        getMyOrders, 
        deleteAll, 
        getAllOrders,
        updateOrderToDelivered
    } from '../controllers/orderController.js'

import { protect, admin } from '../middleware/authHandler.js'

const router = express.Router()


router
    .route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getAllOrders)



router
    .route('/myorders')
    .get(protect, getMyOrders)
    
 

router
    .route('/:id')
    .get(getOrderById)



router
    .route('/:id/pay')
    .put(protect, updateOrderToPaid)


router
    .route('/:id/deliver')
    .put(protect,admin, updateOrderToDelivered)





export default router