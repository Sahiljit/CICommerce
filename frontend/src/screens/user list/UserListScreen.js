import React , {useState, useEffect} from 'react'
import './UserListScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {Button, IconButton}  from '@mui/material'
import {getUserList, deleteUser} from '../../redux/actions/userActions'
import { USER_LIST_RESET } from '../../redux/constants'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';



const UserListScreen = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const userList = useSelector((state) => state.userList)
  const {loading, users, error} = userList
  // console.log(loading)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const deleteHandler = (id) => {

    if(window.confirm("Are you sure"))
    dispatch(deleteUser(id))
  }

  // console.log(users)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(getUserList())     
    }
    else{
      navigate('/')
    }

  },[ dispatch, successDelete])


  return (

    <div className = "user-list">
      <div className="user-list-container">

      <div className="heading">USERS</div>

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
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th>DELETE</th>

        </tr>
      </thead>
      


      <tbody>
        {users.map(user => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name} </td>
            <td>{user.email}</td>
            <td>
            <div className="is-admin">
            {user.isAdmin?
              <CheckCircleOutlineIcon className="tick"/>
              : 
              <CloseIcon className="close"/>
            }
            </div>
            </td>  

            <td>
  
              <IconButton
              onClick = {() => deleteHandler(user._id)}>
                <DeleteIcon className="delete-icon"/>
              </IconButton>
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

export default UserListScreen