import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header/Header';
import HomeScreen from './screens/home screen/HomeScreen';
import ProductScreen from './screens/product screen/ProductScreen';
import CartScreen from './screens/cart screen/CartScreen';
import LoginScreen from './screens/login screen/LoginScreen';
import RegisterScreen from './screens/register screen/RegisterScreen';
import ProfileScreen from './screens/profile screen/ProfileScreen';
import ShippingScreen from './screens/shipping screen/ShippingScreen';
import PaymentMethod from './screens/payment method/PaymentMethod';
import ConfirmOrder from './screens/confirm order/ConfirmOrder'
import OrderStatus from './screens/order status/OrderStatus'
import UserListScreen from './screens/user list/UserListScreen'
import ProductListScreen from './screens/product list/ProductListScreen'
import ProductEditScreen from './screens/product edit/ProductEditScreen'
import OrderListScreen from './screens/order list/OrderListScreen'


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
    <ToastContainer position="top-center" bodyClassName="toastBody" />

    <BrowserRouter>
    <Header/>
      <Routes>      
      <Route path = '/' element = {<HomeScreen/>}/>
      <Route path = '/product/:id' element = {<ProductScreen/>} />
      <Route path = '/cart/'>
        <Route path = ":id" element = {<CartScreen/>}/>
        <Route path = "" element ={<CartScreen/>}/>
      </Route>
      <Route path ='/login' element = {<LoginScreen/>}/>
      <Route path ='/register' element = {<RegisterScreen/>}/>
      <Route path = '/profile' element = {<ProfileScreen/>} />
      <Route path = '/shipping' element = {<ShippingScreen/>} /> 
      <Route path = '/payment-method' element = {<PaymentMethod/>} /> 
      <Route path = '/confirm-order' element = {<ConfirmOrder/>} />
      <Route path = '/order-status/:orderId' element = {<OrderStatus/>} />   
      <Route path = '/admin/user-list' element = {<UserListScreen/>} />  
      <Route path = '/admin/product-list' element = {<ProductListScreen/>} />
      <Route path = '/admin/product/:productId/edit' element = {<ProductEditScreen/>} />  
      <Route path = '/admin/order-list' element = {<OrderListScreen/>} /> 
      <Route path = '/search/:keyword' element = {<HomeScreen/>} /> 

    
     
  
       
      
      
     
      </Routes>  
   </BrowserRouter>
   </>
  );
}

export default App;
