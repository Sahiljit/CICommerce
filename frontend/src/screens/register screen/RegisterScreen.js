import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../../redux/actions/userActions'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {Button}  from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';



import './RegisterScreen.scss'

const RegisterScreen = () => {

      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [message, setMessage] = useState('')


      const dispatch = useDispatch()
      const userRegister = useSelector((state) =>  state.userRegister)
      const{loading, error, userInfo} = userRegister


      const navigate = useNavigate()

      const queryString = useLocation().search
      const queryParams = new URLSearchParams(queryString)
      const redirect = queryParams.get("redirect") ? queryParams.get("redirect") : '/'

      // IMPORTANT: this useEffect will help us to know whether we are already logged-in or not
      useEffect(()=>{
        if(userInfo){
          navigate(redirect)
        }
      }, [userInfo, redirect])



      const clickHandler = (e)=>{
        e.preventDefault()

        if(confirmPassword !== password){
          setMessage('passwords donot match')
        }
        else{
          dispatch(register(name, email, password))   
          }    
        }


  return (
    <div className="register-screen">

        {loading &&  <div className="loading-container">
                  <div className="loading">
                  <CircularProgress className = "loading-icon" />
                  </div>
                 </div>}
        {error &&  
         <div className="error-message">
         {error}
         <CloseIcon className="close-icon"/>

       </div>
         }
        {message && <h3>{message}</h3>}

        <div className="register-screen-container">

          <div className="heading">SIGN UP</div>

          <div className="input-field">
            <input type="text" id="name" required onChange={(e) => setName(e.target.value)}/>
            <label for="name">Enter Name</label>
          </div>

          <div className="input-field">
            <input type="text" id="email" required onChange={(e) => setEmail(e.target.value)}/>
            <label for="email">Enter Email</label>
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
            SIGN UP
        </Button>

        <div className="new-user">
          <span>Have an Account??</span>
          <Button
          onClick = {() => {redirect? navigate(`/login?redirect=${redirect}`) : navigate('/login')}}
          className = "btn-primary"
          // variant="outlined"
        >
          Login
        </Button>
        </div>
     




        </div>        
    </div>
  )
}

export default RegisterScreen