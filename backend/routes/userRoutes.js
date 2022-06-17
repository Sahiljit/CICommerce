import express from 'express'
import {authUser,
        getUserProfile, 
        registerUser, 
        updateUserProfile,
        getUsers,
        deleteUser
    } from '../controllers/userController.js'

import { protect, admin } from '../middleware/authHandler.js'

const router = express.Router()



router
    .route('/')
    .get(protect, admin, getUsers)
    .post(registerUser)

router
    .route('/login')
    .post( authUser)

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    



export default router