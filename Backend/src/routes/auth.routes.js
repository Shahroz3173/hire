import express from 'express'
import {
    checkAvailability,
    userDetails
} from '../controllers/auth.controllers.js'
import { authUser } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/check-availability', checkAvailability)
router.get('/user', authUser, userDetails)

export default router