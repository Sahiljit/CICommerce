import React , {useState, useEffect} from 'react'
import './OrderListScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button, IconButton}  from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getAllOrders } from '../../redux/actions/orderActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';


const OrderListScreen = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const orderList = useSelector((state) => state.orderList)
  const {loading, orders, error} = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(getAllOrders())     
    }
    else{
      navigate('/')
    }

  },[ dispatch])



  return (
    <div className = "order-list">
    <div className="order-list-container">

    <div className="heading">ORDERS</div>

      {loading
      ? 
      <div className="loading-container">
      <div className="loading">
      <CircularProgress className = "loading-icon" />
      </div>
     </div>
      : error
      ? <h1>{error}</h1>
      : 
      <table className="table">
      <thead>
        <tr>
          <th>ORDER ID</th>
          <th>USER</th>
          <th>EMAIL</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>DETAILS</th>
        </tr>
      </thead>    


      <tbody>
        {orders.map(order => (
          <tr>
            <td>{order._id}</td>
            <td>{order.user && order.user.name} </td>
            <td>{order.user && order.user.email} </td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>
            <div className="is-paid">
            {order.isPaid?
              <CheckCircleIcon className="tick"/>
              : 
              <CloseIcon className="close"/>
            }
            </div>
            </td>
            <td>
            <div className="is-delivered">
            {order.isDelivered?
              <CheckCircleIcon className="tick"/>
              : 
              <CloseIcon className="close"/>
            }
            </div>
            </td>  

            <td>
            <Button
              onClick = {() => navigate(`/order-status/${order._id}`)}
              // variant = 'contained'
              className = 'check-details'
              >
                Check
              </Button>
            </td> 
        
          </tr>
        ))}
      </tbody>

    </table>
    }

    


    </div>
    
  </div>
  )
}

export default OrderListScreen