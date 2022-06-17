import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {Button, Menu, MenuItem} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    logout
}
from '../../redux/actions/userActions'

import './Header.scss'

const Header = () => {


  const [keyword, setKeyword] = useState('')


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const navigate = useNavigate()

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const dispatch = useDispatch()

  const logoutHandler = () =>{
    setAnchorEl(null);
    setAnchorEl2(null)
    dispatch(logout())
  }

  const profileHandler = () =>{ 
    setAnchorEl(null);
    navigate('/profile')

  }

  const userListHandler = () => {
    setAnchorEl2(null);
    navigate('/admin/user-list')
  }

  const productListHandler = () => {
    setAnchorEl2(null);
    navigate('/admin/product-list')
  }

  const orderListHandler = () => {
    setAnchorEl2(null);
    navigate('/admin/order-list')

  }

  const searchHandler = (e) => {

    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }


  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  return (
    <div className="header">

      <div className="heading-search">
      <div className="heading" onClick = {() => navigate('/')}>CICommerce</div>

      <div className="row">
          <input 
              id = "countInStock" 
              type="text" 
              placeholder="Search"
              value = {keyword}
              onChange= {(e) => setKeyword(e.target.value)}
          />
          <Button
          className='btn'
          variant="outlined"
          onClick = {searchHandler}
          >
            Search
          </Button>
      </div>

      </div>



        <nav className="navigation">
            <Button className="btn" onClick = {() => navigate('/cart')}>
              Cart
              <ShoppingCartIcon className="icon"/>
            </Button>

            {userInfo ? (
                  <div>
                    <Button
                      // id="basic-button"
                      // aria-controls={open ? 'basic-menu' : undefined}
                      // aria-haspopup="true"
                      // aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      className="btn btn1"
                    >
                      {userInfo.name}
                      <ArrowDropDownIcon className="icon1"/>
                    </Button>
                    <Menu
                      // id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      // sx = {{maxWidth : "300px"}}
                      // MenuListProps={{
                      //   'aria-labelledby': 'basic-button',
                      // }}
  
                    >
                      <MenuItem  style = {{fontSize: "20px"}} onClick={profileHandler}>Profile</MenuItem>
                      <MenuItem  style = {{fontSize: "20px"}} onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                  </div>


            )
            : 
            <Button className="btn btn1" onClick = {() => navigate('/login')}>
              Login
            <LoginIcon className="icon"/>
           </Button>}   

          
           {userInfo && userInfo.isAdmin && (
              <div>
              <Button
                // id="admin"
                // aria-controls={open ? 'basic-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                onClick={handleClick2}
                className="btn btn1"
              >
                ADMIN
                <ArrowDropDownIcon className="icon1"/>
              </Button>
              <Menu
                // id="admin"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                // sx = {{maxWidth : "300px"}}
                // MenuListProps={{
                //   'aria-labelledby': 'basic-button',
                // }}

              >
                <MenuItem  style = {{fontSize: "18px"}} onClick={userListHandler}>Users</MenuItem>
                <MenuItem  style = {{fontSize: "18px"}} onClick={productListHandler}>Products</MenuItem>
                <MenuItem  style = {{fontSize: "18px"}} onClick={orderListHandler}>Orders</MenuItem>
              </Menu>
            </div>

           )}         


        </nav>

    </div>
  )
}

export default Header