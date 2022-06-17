import React , {useState, useEffect} from 'react'
import './ProductListScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button, IconButton}  from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { listProducts, deleteProduct, createProduct} from '../../redux/actions/productActions'
import {PRODUCT_CREATE_RESET} from '../../redux/constants'
import CircularProgress from '@mui/material/CircularProgress';



const ProductListScreen = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products} = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: succesDelete} = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: succesCreate, product: createdProduct} = productCreate




  useEffect(() => {

    dispatch({type: PRODUCT_CREATE_RESET})   // we have to do this... so as to set successCreate as false

    if(!userInfo || !userInfo.isAdmin){
      navigate('/')
    }

    if(succesCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }
    else{ 
      dispatch(listProducts())
    }


  }, [dispatch, userInfo, succesDelete, succesCreate, createdProduct])



  const deleteHandler = (id) => {

    if(window.confirm("Are you sure ?"))
    dispatch(deleteProduct(id))
  }


  const createHandler = () => {
    dispatch(createProduct())
  }

  


  return (
    <div className = "product-list">
        <div className="product-list-container">

        <div className="row1">
        <div className="heading">PRODUCTS</div>
        <Button
        className = "btn"
        variant = "contained"
        onClick={createHandler}
        >
          CREATE PRODUCT
          <AddIcon className = 'icon'/>
        </Button>
        </div>

        {loading
        ? 
        <div className="loading-container">
        <div className="loading">
        <CircularProgress className = "loading-icon" />
        </div>
       </div>
        : error
        ? <h1>{error}</h1>
        : 
          <table className="table">
          <thead>
            <tr>
              <th className = "first-col">NAME</th>
              <th>PRICE</th>
              <th>RATING (NO.REVIEWS)</th>
              <th>CATEGORY</th>
              <th>QUANTITY</th>
              <th>EDIT / DELETE</th>

            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr>
                <td className = "first-col">{product.name} </td>
                <td>{product.price}</td>
                {product.rating ?
                  <td>{(product.rating).toFixed(1)} ({product.numReviews})</td>
                  : 
                  <td>0 (0)</td>
                }
                {/* <td> {product.rating}  </td>      */}
                <td>{product.category}</td>
                <td>{product.countInStock}</td>    
                
                <td>
                  <div className="edit-row">
                  <IconButton
                  onClick ={() => navigate(`/admin/product/${product._id}/edit`)}
                  >
                    <EditIcon className="edit-icon"/>
                  </IconButton>

                  <IconButton
                  onClick = {() => deleteHandler(product._id)}
                  >
                    <DeleteIcon className="delete-icon"/>
                  </IconButton>
                  </div>             
                </td> 
            
              </tr>
            ))}
          </tbody>

          </table>
        }
        </div>
      
    </div>
  )
}

export default ProductListScreen