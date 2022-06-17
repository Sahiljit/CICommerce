import React from 'react'
import {Button} from '@mui/material'
import './CheckoutSteps.scss'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useNavigate} from 'react-router-dom'

const CheckoutSteps = ({step1, step2, step3, step4}) => {

    const navigate = useNavigate()


  return (
    <div className="Checkout-steps">

        <Button className = "btn" onClick={()=> navigate('/cart')} >
            CART
            <ChevronRightIcon className = 'icon'/>
        </Button>

        {step2?
        <Button className = "btn" onClick={()=> navigate('/shipping')}>
            SHIPPING
            <ChevronRightIcon className = 'icon'/>
        </Button>
        :
        <Button className = "btn btnd" disabled>
            SHIPPING
            <ChevronRightIcon className = 'icon'/>
        </Button>}

        {step3?
        <Button className = "btn" onClick={()=> navigate('/payment-method')}>
            PAYMENT METHOD
            <ChevronRightIcon className = 'icon'/>
        </Button>
        :
        <Button className = "btn btnd" disabled>
            PAYMENT METHOD
            <ChevronRightIcon className = 'icon'/>
        </Button>}


        {step4?
        <Button className = "btn" >
            CONFIRM ORDER
        </Button>
        :
        <Button className = "btn btnd" disabled>
            CONFIRM ORDER
        </Button>}


    </div>
  )
}

export default CheckoutSteps