import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,




}
from '../constants'


// this basically is dispatched from when we confirm order on confirm order screen
export const createOrder = (order) => async(dispatch, getState) => {

 try{

    dispatch({
        type: ORDER_CREATE_REQUEST
    })


    // this is how we destructure 2 levels down 
    const {userLogin: {userInfo}} = getState()

    const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data
    })

    }catch (error) {
        dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}



export const getOrderDetails = (id) => async(dispatch, getState) => {

    try{
        
        // console.log('order details request sent')

       dispatch({
           type: ORDER_DETAILS_REQUEST
       })
   
    //    console.log('get order detials action is running')
       // this is how we destructure 2 levels down 
       const {userLogin: {userInfo}} = getState()
   
       const config = {
       headers: {
           Authorization: `Bearer ${userInfo.token}`
           }
       } 

    //    console.log('order details 2')

   
       const { data } = await axios.get(`/api/orders/${id}`, config)

    //    console.log('order details 1')
    //    console.log("order details", data.orderItems)
   
       dispatch({
           type: ORDER_DETAILS_SUCCESS,
           payload: data
       })
   
       }catch (error) {
           dispatch({
           type: ORDER_DETAILS_FAIL,
           payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
           })
       }
   }


export const payOrder = (id, paymentResult) => async(dispatch, getState) => {

    try{
   
       dispatch({
           type: ORDER_PAY_REQUEST
       })
   
   
       // this is how we destructure 2 levels down 
       const {userLogin: {userInfo}} = getState()
   
       const config = {
       headers: {
           'Content-Type' : 'application/json',
           Authorization: `Bearer ${userInfo.token}`
           }
       } 
   
      const {data} = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
   
       dispatch({
           type: ORDER_PAY_SUCCESS,
           payload: data
       })
   
       }catch (error) {
           dispatch({
           type: ORDER_PAY_FAIL,
           payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
           })
       }
   }


export const getMyOrders = () => async(dispatch, getState) => {

    try{
   
       dispatch({
           type: MY_ORDERS_REQUEST
       })
   
   
       // this is how we destructure 2 levels down 
       const {userLogin: {userInfo}} = getState()
   
       const config = {
       headers: {
           Authorization: `Bearer ${userInfo.token}`
           }
       } 
   
      const {data} = await axios.get(`/api/orders/myorders`, config)
   
       dispatch({
           type: MY_ORDERS_SUCCESS,
           payload: data
       })
   
       }catch (error) {
           dispatch({
           type: MY_ORDERS_FAIL,
           payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
           })
       }
   }

   

export const getAllOrders = () => async(dispatch, getState) => {

    try{   
       dispatch({
           type: ORDER_LIST_REQUEST
       })   
   
       // this is how we destructure 2 levels down 
       const {userLogin: {userInfo}} = getState()
   
       const config = {
       headers: {
           Authorization: `Bearer ${userInfo.token}`
           }
       } 
   
      const {data} = await axios.get(`/api/orders/`, config)
   
       dispatch({
           type: ORDER_LIST_SUCCESS,
           payload: data
       })
   
       }catch (error) {
           dispatch({
           type: ORDER_LIST_FAIL,
           payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
           })
       }
   }


export const deliverOrder = (id) => async(dispatch, getState) => {

    try{   
       dispatch({
           type: ORDER_DELIVER_REQUEST
       })
      
       // this is how we destructure 2 levels down 
       const {userLogin: {userInfo}} = getState()
   
       const config = {
       headers: {
           Authorization: `Bearer ${userInfo.token}`
           }
       } 
   
      const {data} = await axios.put(`/api/orders/${id}/deliver`, {}, config)
   
       dispatch({
           type: ORDER_DELIVER_SUCCESS,
           payload: data
       })
   
       }catch (error) {
           dispatch({
           type: ORDER_DELIVER_FAIL,
           payload:
               error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
           })
       }
   }






