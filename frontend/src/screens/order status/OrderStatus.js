import React , {useState, useEffect} from 'react'
import './OrderStatus.scss'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {Button}  from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getOrderDetails, payOrder, deliverOrder} from '../../redux/actions/orderActions'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET } from '../../redux/constants'
import CircularProgress from '@mui/material/CircularProgress';


const OrderStatus = () => {

  const {orderId} = useParams()
  console.log(orderId)

  const [sdkReady, setSdkReady] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, loading, error} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay} = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const {loading: loadingDeliver, success: successDeliver} = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  console.log('hey there')
  // console.log(order.orderItems)


  if(Object.keys(order).length !== 0){

        // calculate prices  
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
         )
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId))
  }


  useEffect(() => {


    const addPayPalScript = async() => {

      const {data: clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
          setSdkReady(true)
      }

      console.log('skdready')

      document.body.appendChild(script)
    }


    if(Object.keys(order).length === 0 || successPay|| order._id !== orderId || successDeliver){

      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId))

    }
    else if(!order.isPaid){
      if(!window.paypal)
      addPayPalScript()
      else
      setSdkReady(true)
    }


  
  }, [dispatch, orderId, order,successPay, successDeliver])


  let thirdClass = order.isPaid? 'none' : 'third'
  let thanksClass = order.isPaid? 'thanks': 'none'
  let finalClass = order.isPaid? 'final' : 'none'
  

  // 625c1732cca22bdd5a0bb713
  // 6259b3012750391151d4a419


  const successPaymentHandler = (paymentResult) => {

    console.log(paymentResult)
    console.log('inside successPaymentHandler')

    dispatch(payOrder(orderId, paymentResult))
    

  }




  return (

    <div className="order-status-screen">

      <Button  className= "go-back" variant = 'outlined' onClick = {() => navigate('/confirm-order')}> 
        <ArrowBackIcon className="icon"/>
        Go Back
      </Button>

      {
            loading?
            <div className="loading-container">
            <div className="loading">
            <CircularProgress className = "loading-icon" />
            </div>
           </div>
            : 
            error? <p>{error}</p>
            :
            <>

            <div className = {`grid-container ${thirdClass}`}>


              <div className="first">

                  <div className="heading">Buyer Details</div>

                  <div className="row">
                    <div className="text">
                      Buyer's Name
                      </div>
                      <div className="value">
                      {order.user.name}
                        </div>
                  </div>

                  <div className="row">
                    <div className="text">
                      Buyer's email id 
                      </div>
                      <div className="value">
                      {order.user.email}
                        </div>
                  </div>


              </div>

              <div className="second">

              <div className="heading">Order Status</div>


              <div className="row">
                    <div className="text">
                      Order Id 
                      </div>
                      <div className="value order-id">
                      {orderId}
                        </div>
                  </div>

              <div className="row">
                <div className="text">
                  Order Price 
                  </div>
                  <div className="value price">
                  {order.totalPrice}
                    </div>
              </div>

                  <div className="row">
                    <div className="text">
                      Paid On 
                      </div>
                      {order.isPaid?
                        <div className="value paid">      
                         {order.paidAt.substring(0, 10)}
                          </div>
                        : 
                          <div className="value not">
                            Not Paid Yet
                            <CloseIcon className = 'icon'/>
                          </div>
                      }
                  </div>

                
                  {order.isDelivered
                  ?
                  <div className="row">
                      <div className="text">
                       Delivered 
                      </div>
                      <div className="value">
                        <CheckCircleIcon className = 'tick-icon'/>
                      </div>              
                  </div>
                  : 
                  <div className="row">
                    <div className="text">Expected Delivery</div>
                    {order.isPaid
                      ?
                      <div className="value date">2022-06-20</div>
                      :
                      <div className="value not">
                        Not Paid Yet
                        <CloseIcon className = 'icon'/>
                      </div>
                    }
                  </div>

                  }


              </div>

              <div className={thirdClass}>
                
                {loadingPay && <h1>loading...</h1>}
                {!sdkReady ?
                  <div className="loading-container">
                  <div className="loading">
                  <CircularProgress className = "loading-icon" />
                  </div>
                 </div>
                :
                (<div className="third-container">
                  <div className="heading">Pay Now</div>

                  <div className="row">
                    <div className="text">
                      Payment Method 
                      </div>
                      <div className="value payment">
                      {order.paymentMethod}
                        </div>
                  </div>

                  <div className="btn-container">
                    <PayPalButton
                    amount = {order.totalPrice}
                    onSuccess={successPaymentHandler}                  
                  />
                  </div>
                
                </div>)              
                }

              </div>

            </div>


            <div className = {finalClass}>
            <div className={`thanks ${thanksClass}`}>
              Thanks for Shopping with us !
              <FavoriteIcon className = "icon"/>
              </div>
              
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div className="mark-delivered">
                  <Button
                  className = 'btn'
                  variant = "contained"
                  onClick = {deliverHandler}
                  >
                    MARK AS DELIVERED
                  </Button>
                </div>
                  )}
              
             

           
            </div>


            </>
      }
      </div>

  )
}

export default OrderStatus