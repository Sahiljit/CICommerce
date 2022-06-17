import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails, updateProduct} from '../../redux/actions/productActions'
import {useNavigate, useParams} from 'react-router-dom'
import {Button}  from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProductEditScreen.scss'
import { PRODUCT_UPDATE_RESET } from '../../redux/constants'
import CircularProgress from '@mui/material/CircularProgress';



const ProductEditScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    // const [uploading, setUploading] = useState(false)

    const {productId} = useParams()

    console.log(productId)



    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails


    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error:errorUpdate,success: successUpdate, product: updatedProduct } = productUpdate



    const updateProductHandler = ()=> {
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }))
    }


    useEffect(() => {

        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})  // we hav to do this.. so as to set successUpdate as false
            navigate('/admin/product-list')
        }
       
        if (!product.name || product._id !== productId) {    // here checking productId is really impt because our global state may already have some different product with diff id
            dispatch(listProductDetails(productId))
          } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
          }
    }, [dispatch, productId, product, successUpdate])



  return (
    <div className="product-edit-screen">
    <Button  className= "go-back" variant = 'outlined' onClick = {() => navigate('/admin/product-list')}> 
      <ArrowBackIcon className="icon"/>
      Go Back
      </Button>
        <div className="product-edit-container">
        <div className="heading">Product Details</div>
           
            <div className="row">
            <label for= "name">Name</label>
            <input 
                id = "name" 
                type="text" 
                placeholder="Enter product name"
                value ={name}
                onChange= {(e) => setName(e.target.value)}
            />
            </div>
            <div className="row">
            <label for= "price">Price</label>
            <input 
                id = "price" 
                type="text" 
                placeholder="Enter price"
                value={price}
                onChange= {(e) => setPrice(e.target.value)}

            />
            </div>
            <div className="row">
            <label for= "image">Image</label>
            <input 
                id = "image" 
                type="text" 
                placeholder="Select Image"
                value={image}
                onChange= {(e) => setImage(e.target.value)}

            />
            </div>
            <div className="row">
            <label for= "brand">Brand</label>
            <input 
                id = "brand" 
                type="text" 
                placeholder="Enter brand"
                value ={brand}
                onChange= {(e) => setBrand(e.target.value)}

            />
            </div>
            <div className="row">
            <label for= "category">Category</label>
            <input 
                id = "category" 
                type="text" 
                placeholder="Enter category"
                value={category}
                onChange= {(e) => setCategory(e.target.value)}

            />
            </div>
            <div className="row">
            <label for= "countInStock">Count In Stock</label>
            <input 
                id = "countInStock" 
                type="text" 
                placeholder="Stock"
                value={countInStock}
                onChange= {(e) => setCountInStock(e.target.value)}

            />
            </div>
            <div className="row">
            <label for= "Description">Description</label>
            <textarea 
                id = "Description" 
                type="text" 
                placeholder="Description"
                value={description}
                onChange= {(e) => setDescription(e.target.value)}

            />
            </div>



        <Button
        variant = "contained"
        className = 'btn'
        onClick = {updateProductHandler}
        >
            SAVE
            <SaveIcon className="icon"/>
        </Button>

        </div>
    </div>
  )
}

export default ProductEditScreen