import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'


// @desc Create new order
// @route POST /api/orders/
// @access private

export const addOrderItems = asyncHandler(async(req, res) => {

    const {
    orderItems,
    shippingAddress, 
    paymentMethod , 
    itemsPrice,          
    shippingPrice, 
    taxPrice, 
    totalPrice
             } = req.body

    
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error("No order items found")
        return
    }

    else{

        const order = new Order({
            orderItems,
            user : req.user._id,  // this is impt, as this is protected route... so we are adding request object while authenticating token only. 
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)

    }


})



// @desc   GET order by ID
// @route  GET /api/orders/:id
// @access private

export const getOrderById = asyncHandler(async(req, res) => {

    // we are able to populate here because order document already has userId in user field
    // in the database... by the endpoint implemented above. And below are are populating
    // name and email of user... in order's query.

    const order = await Order.findById(req.params.id).populate('user', 'name email')   

    if(order)
    res.json(order)
    
    else{
        res.status(404)
        throw new Error('Order not found')
    }


})


// @desc   UPDATE order to paid
// @route  PUT /api/orders/:id/pay
// @access private

export const updateOrderToPaid = asyncHandler(async(req, res) => {

    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address : req.body.payer.email_address
        }
        

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{

        res.status(404)
        throw new Error('Order not found')

    }
})


// @desc  GET logged in users orders
// @route GET /api/orders/myorders
// @access private

export const getMyOrders = asyncHandler(async(req, res) => {


    const orders = await Order.find({user : req.user._id})    
    res.json(orders)

})


export const deleteAll = asyncHandler(async(req, res) => {

    await Order.deleteMany({})
    res.json({success: 'true'})

})


// @desc Get All orders
// @route GET api/order
// @access Private Admin

export const getAllOrders = asyncHandler(async(req, res) => {

    const orders = await Order.find({}).populate('user', 'id name email')

    res.json(orders)

})

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private admin

export const updateOrderToDelivered = asyncHandler(async(req, res) => {
    
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.DeliveredAt = Date.now() 

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }

})





