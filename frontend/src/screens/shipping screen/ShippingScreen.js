import React, {useState} from 'react'
import './ShippingScreen.scss'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../../redux/actions/cartActions'
import {Button}  from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckoutSteps from '../../components/Checkout steps/CheckoutSteps'
import CircularProgress from '@mui/material/CircularProgress';



const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart 

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode , setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const navigate = useNavigate()

    const clickHandler = () => {

      dispatch(saveShippingAddress({address, city, postalCode, country}))

      navigate('/payment-method')
    }

  return (
    <div className = 'shipping-screen'>

        <div className="checkout-steps">
        <CheckoutSteps  step1 step2/>
        </div>
        
        <div className="shipping-screen-container">

            <div className="heading">SHIPPING</div>

            <div className="input-field">
              <input type="text" id="address" value ={address} required onChange={(e) => setAddress(e.target.value)}/>
              <label for="address">Address</label>
            </div>

            <div className="input-field">
              <input type="text" id="city" value ={city} required onChange={(e) => setCity(e.target.value)}/>
              <label for="city">City</label>
            </div>

            <div className="input-field">
              <input type="text" id="postal-code" value ={postalCode} required onChange={(e) => setPostalCode(e.target.value)}/>
              <label for="postal-code">Postal Code</label>
            </div>

            <div className="input-field">
              <input type="text" id="country" value ={country} required onChange={(e) => setCountry(e.target.value)}/>
              <label for="country"> Country</label>
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

export default ShippingScreen