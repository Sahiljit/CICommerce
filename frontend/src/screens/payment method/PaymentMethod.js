import React, {useState} from 'react'
import './PaymentMethod.scss'
import {useDispatch, useSelector} from  'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button, Radio} from '@mui/material'
import CheckoutSteps from '../../components/Checkout steps/CheckoutSteps'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { savePaymentMethod } from '../../redux/actions/cartActions'
import CircularProgress from '@mui/material/CircularProgress';





const PaymentMethod = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const clickHandler = ()=> {

        dispatch(savePaymentMethod('Paypal'))
        navigate('/confirm-order')
    }
    
    

  return (
    <div className = 'payment-method-screen'>

        <div className="checkout-steps">
        <CheckoutSteps  step1 step2 step3/>
        </div>
        
    <div className="payment-method-screen-container">

        <div className="heading">Select Payment Method</div>

        <div className="payment-method">
            <Radio
                checked={paymentMethod === 'a'}
                onChange={(e)=> setPaymentMethod(e.target.value)}
                value="a"
                className="radio"
                size="large"
                // name="radio-buttons"
                // inputProps={{ 'aria-label': 'A' }}
             />
             <div className = "name">PayPal</div>
        </div>

        <div className="payment-method">
            <Radio
                checked={paymentMethod === 'b'}
                onChange={(e)=> setPaymentMethod(e.target.value)}
                value="b"
                className="radio"
                size="large"
                // name="radio-buttons"
                // inputProps={{ 'aria-label': 'A' }}
             />
             <div className = "name">UPI</div>
        </div>


        <div className="payment-method">
            <Radio
                checked={paymentMethod === 'c'}
                onChange={(e)=> setPaymentMethod(e.target.value)}
                value="c"
                className="radio"
                size="large"
                // name="radio-buttons"
                // inputProps={{ 'aria-label': 'A' }}
             />
             <div className = "name">Credit Card or Debit Card</div>
        </div>


        <div className="payment-method">
            <Radio
                checked={paymentMethod === 'd'}
                onChange={(e)=> setPaymentMethod(e.target.value)}
                value="d"
                className="radio"
                size="large"
                // name="radio-buttons"
                // inputProps={{ 'aria-label': 'A' }}
             />
             <div className = "name">Stripe</div>
        </div>


        <div className="payment-method">
            <Radio
                checked={paymentMethod === 'e'}
                onChange={(e)=> setPaymentMethod(e.target.value)}
                value="e"
                className="radio"
                size="large"
                // name="radio-buttons"
                // inputProps={{ 'aria-label': 'A' }}
             />
             <div className = "name">Net Banking</div>
        </div>





        <Button 
          variant="contained" 
          onClick = {clickHandler}
          className="btn"           
          > 
          CONTINUE
          <ArrowForwardIcon className="icon"/>
        </Button>

        </div>   
        

    </div>
  )
}

export default PaymentMethod