import React, { useEffect } from 'react'
import './ConfirmOrder.scss'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/Checkout steps/CheckoutSteps'
import {useNavigate} from 'react-router-dom'
import {Button}  from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {createOrder, getOrderDetails} from '../../redux/actions/orderActions'

import {ORDER_DETAILS_RESET,ORDER_CREATE_RESET} from '../../redux/constants'
import CircularProgress from '@mui/material/CircularProgress';





const ConfirmOrder = () => {  

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)

      //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    const navigate = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    const clickHandler = () => {
        
        dispatch(createOrder({
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            shippingPrice : cart.shippingPrice,
            paymentMethod : cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice
        }))


    }

    useEffect(()=> {
        if(success){
            // dispatch(getOrderDetails(order._id))
            dispatch({ type: ORDER_DETAILS_RESET })
            navigate(`/order-status/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
            dispatch(getOrderDetails(order._id))

        }
    }, [success])
 

  return (
    <div className = 'confirm-order'>


        <div className="checkout-steps">
            <CheckoutSteps  step1 step2 step3 step4/>
        </div>

        <div className="order-summary-container">

            <div className="left">

                <div className="shipping">
                    <div className="heading">Shipping Address</div>
                    <div className="text ">{cart.shippingAddress.address}</div>
                    <div className="text ">{cart.shippingAddress.city}</div>
                    <div className="text ">{cart.shippingAddress.postalCode}</div>
                    <div className="text ">{cart.shippingAddress.country}</div>

                </div>

                <div className="order-items">
                    <div className="heading">Order Items</div>

                    {cart.cartItems.length=== 0 ?
                    (
                        <h2>Your Cart is Empty</h2>
                    ):
                    <div className="cart-items-container">

                        {cart.cartItems.map(item => (

                            <div className="cart-item">

                                <div className="item-name" onClick = {() => navigate(`/product/${item.product}`)}>
                                    {item.name}
                                    
                                </div>

                                <div className="price">
                                    {item.qty} &#215; {item.price} = {item.qty * item.price}
                                </div>

                            </div>
                        ))}

                    </div>                  
                    }
                </div>

            </div>

            <div className="right">
                
                <div className="payment-method">
                    <div className="heading ">Payment Method -</div>
                    <div className="text">{cart.paymentMethod}</div>
                </div>

                <div className="order-summary">
                    <div className="heading">Order Summary</div>

                    <div className="inner">
                       <div className="text"> Items Price</div>
                        <div className="value"> {cart.itemsPrice}</div>
                    </div>
                    <div className="inner">
                        <div className="text">Shipping Cost</div>
                       <div className="value">{cart.shippingPrice}</div>
                        
                    </div>
                    <div className="inner">
                       <div className="text">Tax</div> 
                       <div className="value">{cart.taxPrice}</div> 
                    </div>
                    <div className="inner final">
                        <div className="text ">Total Price</div>
                        <div className="value">{cart.totalPrice}</div>
                    </div>

                <Button
                className = 'btn'
                onClick = {clickHandler}
                variant = "contained">
                    Confirm Order
                    <ArrowForwardIcon className = "icon"/>
                </Button>

                </div>

            </div>
        </div>

    </div>
  )
}

export default ConfirmOrder