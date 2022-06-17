import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { listProducts} from '../../redux/actions/productActions'
import Product from '../../components/productCard/Product'
import './HomeScreen.scss'
import CircularProgress from '@mui/material/CircularProgress';





const HomeScreen = () => {


  const dispatch = useDispatch()

  const {keyword} = useParams()
  console.log(keyword)

  const productList = useSelector((state) => state.productList)
  const {loading, error, products} = productList

  useEffect(()=>{
      
    dispatch(listProducts(keyword))  

  }, [dispatch, keyword])



  return (
    <div className="homeScreen">

      {loading? 
        <div className="loading-container">
        <div className="loading">
        <CircularProgress className = "loading-icon" />
        </div>
      </div>      
      : error ? {error}
      : 
      <>
      <div className ="heading">Recommended Books</div>
      <div className="grid-container">
        {products.map(product => (
          <Product product = {product}/>
        ))}
      </div>

      </>}

      
    </div>
  )
}

export default HomeScreen