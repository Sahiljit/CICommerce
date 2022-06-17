import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails, createProductReview} from '../../redux/actions/productActions'
import {Button, Rating } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {useParams, useNavigate} from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/constants';
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';





import './ProductScreen.scss'

const ProductScreen = () => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()
   
    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails


    const productCreateReview = useSelector((state) => state.productCreateReview)
    const { success: successProductReview, loading: loadingProductReview,  error: errorProductReview} = productCreateReview



    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()
  

    console.log(product) 
   
   useEffect(() => {
     
      if (successProductReview) { 
        setRating(0)
        setComment('')
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        dispatch(listProductDetails(id))
        alert("Review Submitted")

      }

      if (!product._id || product._id !== id) {
        dispatch(listProductDetails(id))
      }
    }, [dispatch, id, successProductReview])


    useEffect(() => {
     
     
        dispatch(listProductDetails(id))
      
    }, [])

  
    useEffect(() => {
      if(errorProductReview != null){
        if(`${errorProductReview}`.includes("token"))
          toast.error("Please Sign In to Review")
        else
        toast.error(`${errorProductReview}`)
        console.log("inside if statement")     
  
      }
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

      // dispatch({type: UP_VOTE_RESET})
    }, [errorProductReview])


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)

    }

    const submitReviewHandler = () => {

      dispatch(createProductReview(id, {
        rating,
        comment
      }))
    }


  return (
    
    <div className="product-screen">
      <Button  className= "go-back" variant = 'outlined' onClick = {() => navigate('/')}> 
      <ArrowBackIcon className="icon"/>
      Go Back
      </Button>


      {loading?
             <div className="loading-container">
             <div className="loading">
             <CircularProgress className = "loading-icon" />
             </div>
            </div>
            :error ? <h3>{error}</h3>
            :
            <>
            {product && 
            <div className="grid-container">
             
            <div className="left">
            <img  className="img" src= {product.image} alt = {product.name}/>
            </div>

            <div className="right">

              <div className="name">{product.name}</div>
              <div className="description">Description:</div>
              <div className="description-text">{product.description}</div>
              <div className="reviews">
                {product.rating &&
                  <div className="product-rating">{(product.rating).toFixed(1)}</div>
                }
                <Rating className = "rating" name="half-rating-read" value={product.rating}  precision={0.5} readOnly />
                <div className="num-reviews">({product.numReviews} ratings)</div>
              </div>

              <span className="price">
              &#8377;{product.price} 
              </span>

              <span className="status">
              Status:
              <span className="status-value">
              {product.countInStock >0 ? 'In stock' : 'Out of Stock'}
              </span>
              </span>

              <div className="input-select-cart-btn">

                  <div className="input-select">
                  <label className="label">Select Quantity</label>
                
                  <select required
                  onChange={(e)=>{setQty(e.target.value)}}
                  >

                  {
                      [...Array(product.countInStock).keys()].map((x) =>(
                          <option value={x+1}>{x+1}</option>                                   
                          ))
                  } 
                  </select>                 
                  </div>

                  <Button 
                  onClick= {addToCartHandler}
                  disabled = {product.countInStock === 0}
                  className="btn"
                  variant="contained"
                  >
                    Add to Cart
                    <ShoppingCartCheckoutIcon className="cart-icon"/>
                  </Button>

              </div>

              
              <div className="reviews-container">

                  <div className="heading1">Reivew Product</div>

                  <div className="row">
                    <span className="rate-product">Rate product</span>
                    <div className="rating-wrapper">
                    <Rating 
                      className = "rating1" 
                      name="half-rating-read" 
                      value={rating}   
                      onChange = {(e) => setRating(e.target.value) }
                      size ="20px"
                    />

            
                    </div>
                  
                    </div>

                  <div className="row">
                    <div className = "label">Comment</div>
                    <textarea 
                        id = "Description" 
                        type="text" 
                        placeholder="Comment"
                        value={comment}
                        onChange= {(e) => setComment(e.target.value)}

                    />
                    </div>

                    <Button
                    variant= "contained"
                    onClick = {submitReviewHandler}
                    className = "btn"
                    >
                      Submit
                    </Button>


                  <div className="read-review">
                    <div className="heading2">Read more reviews</div>
                    {product.reviews.length === 0 && <h1>No Reviews</h1>}

                    {product.reviews.map(review => (
                        <div className="row-review">

                          <div className ="review-name">{review.name}</div>
                          <Rating className = "rating" name="half-rating-read" value={review.rating}  precision={0.5} readOnly />
                          <div className = "review-text">{review.comment}</div>

                        </div>
                    ))}
                   


                  </div>

              </div>


            </div>

          </div>
            }
            
            </>
      }


      
    </div>
  )
}

export default ProductScreen