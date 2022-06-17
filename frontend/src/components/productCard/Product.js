import React from 'react'
import './Product.scss'
import {Card , Button, CardMedia,
        CardContent, CardActions
        ,Rating} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const Product = ({product}) => {

    const navigate = useNavigate()

  return (
    <div className="product">

    <Card className="product-card">
            
            <CardMedia
                component="img"
                className="img"
                image= {product.image}
                alt= {product.name}   
                onClick = {() => navigate(`/product/${product._id}`)}            
            />
            <CardContent onClick = {() => navigate(`/product/${product._id}`)} className = "card-content">
                    <div className="card-heading">
                    {product.name}
                    </div>
                    
                    <div className="rating-container">
                    <Rating component="span" className="rating" name="half-rating-read" value={product.rating}  precision={0.5} readOnly />
                        <span className="reviews">
                         ~{product.numReviews} reivews
                        </span>
                    </div>
                    
                    <span className="price"> &#8377;{product.price} </span>


            </CardContent>
                
       
    </Card>

    </div>
  )
}

export default Product