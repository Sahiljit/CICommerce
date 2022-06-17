import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login} from '../../redux/actions/userActions'
import {useNavigate, useLocation} from 'react-router-dom'
import {Button}  from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';



import './LoginScreen.scss'

const LoginScreen = () => {


      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')


      const dispatch = useDispatch()
      const userLogin = useSelector((state) =>  state.userLogin)
      const{loading, error, userInfo} = userLogin


      const navigate = useNavigate()

      const queryString = useLocation().search
      const queryParams = new URLSearchParams(queryString)
      
      const redirect = queryParams.get("redirect") ? `/${queryParams.get("redirect")}` : '/'      
      // let redirect2 = `/${redirect}`
      console.log(redirect)      

      // IMPORTANT: this useEffect will help us to know whether we are already logged-in or not
      useEffect(()=>{
        if(userInfo){
          navigate(redirect)
        }
      }, [userInfo, redirect])



      const clickHandler = (e)=>{
        e.preventDefault()

        dispatch(login(email, password))       
        }


  return (
    <div className="login-screen">

        {loading && 
            <div className="loading-container">
            <div className="loading">
            <CircularProgress className = "loading-icon" />
            </div>
           </div>
        }
        {
          error &&
          <div className="error-message">
            {error}
            <CloseIcon className="close-icon"/>

          </div>
        }

        <div className="login-screen-container">

          <div className="heading">SIGN IN</div>

          <div className="input-field">
            <input type="text" id="name" required onChange={(e) => setEmail(e.target.value)}/>
            <label for="name">Enter Email</label>
          </div>

          <div className="input-field">
            <input type="password" id="password" required onChange ={(e)=> setPassword(e.target.value)}/>
            <label for="password">Enter Password</label>
          </div>

          <Button 
            variant="contained" 
            onClick = {clickHandler}
            className="btn"           
            > 
            SIGN IN
        </Button>

        <div className="new-user">
          <span>New User??</span>
          <Button
          onClick = {() => {redirect? navigate(`/register?redirect=${redirect}`) : navigate('/register')}}
          className = "btn-primary"
          // variant="outlined"
        >
          Register
        </Button>
        </div>





        </div>        
    </div>
  )
}

export default LoginScreen