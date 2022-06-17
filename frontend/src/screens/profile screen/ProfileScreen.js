import React, {useState, useEffect} from 'react'
import './ProfileScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import {updateUserProfile, getUserDetails} from '../../redux/actions/userActions'
import { getMyOrders } from '../../redux/actions/orderActions'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {Button}  from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';




const ProfileScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()


  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const {loading, error, user} = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {success} = userUpdateProfile

  const myOrders = useSelector((state) => state.myOrders)
  const {loading: loadingMyOrders, orders, error: errorMyOrders} = myOrders

  useEffect(()=>{

    // by this logic profile page will only be shown if user is logged in 
    if(!userInfo){
      navigate('/login')
    }
    else{

      if(!user.name){
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrders())
      }

      else{
        setName(user.name)
        setEmail(user.email)
      }

    }

  },[dispatch, user, userInfo])

  
  const clickHandler = () => {
    if(password !== confirmPassword)
    setMessage('Passwords do not match')

    else{
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  }




  return (
    <div className="profile-screen">
      <div className="left">
          {loadingMyOrders 
          ? 
          <div className="loading-container">
          <div className="loading">
          <CircularProgress className = "loading-icon" />
          </div>
         </div>
          : 
          errorMyOrders?
          <p>{errorMyOrders}</p>
          :
          <div className="left-container">

            <div className="heading">MY ORDERS</div>

            <table className="table">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>DATE</th>
                  <th>PRICE</th>
                  <th>PAID ON</th>
                  <th>DELIVERED</th>
                  <th>DETAILS</th>
                </tr>
              </thead>


              <tbody>
                {orders.map(order => (
                  <tr>
                    {/* <td>{order._id}</td> */}
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice} </td>
                    <td>
                      {order.isPaid ? (
                        <div className="paid-at">
                          {order.paidAt.substring(0,10)}
                        </div>
                      ): (
                        <div className="not-paid">
                          <CloseIcon className= "icon"/>
                        </div>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                      <div className="delivered">
                        <CheckCircleIcon className= "icon"/>
                      </div>
                      ): (
                        <div className="not-paid">
                          <CloseIcon className= "icon"/>
                        </div>
                      )}
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

          </div>
          }

      </div>
      <div className="right">
        <div className="profile-section">

        {loading && <h2>loading...</h2>}
        {error &&  <h3>{error}</h3> }
        {message && <h3>{message}</h3>}
        {success && <div className = "success-message">
          User Profile Updated Successfully
          <DoneIcon className = "success-icon"/>
        </div>}


        <div className="profile-section-container">

          <div className="heading">MY PROFILE</div>

          <div className="input-field">
            <input type="text" id="name" value={name} required onChange={(e) => setName(e.target.value)}/>
            <label for="name">Update Name</label>
          </div>

          <div className="input-field">
            <input type="text" id="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
            <label for="email">Update Email</label>
          </div>

          <div className="input-field">
            <input type="password" id="password" required onChange ={(e)=> setPassword(e.target.value)}/>
            <label for="password">Enter Password</label>
          </div>

          <div className="input-field">
            <input type="password" id="confirm-password" required onChange ={(e)=> setConfirmPassword(e.target.value)}/>
            <label for="confirm-password">Confirm Password</label>
          </div>

          <Button 
            variant="contained" 
            onClick = {clickHandler}
            className="btn"           
            > 
            Update Profile
        </Button>

            </div>        
        </div>
      </div>

        
    </div>
  )
}

export default ProfileScreen