import {combineReducers} from 'redux'

import { cartReducer } from './cartReducers'

import {
    productDetailsReducer,
    productListReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,

} from './productReducers'

import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    
}
from './userReducers'


import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrdersReducer,
    orderListReducer,
    orderDeliverReducer,
}
from './orderReducers'




export default combineReducers({
   
    cart: cartReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    myOrders : myOrdersReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    productDelete : productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    productCreateReview: productCreateReviewReducer,

})