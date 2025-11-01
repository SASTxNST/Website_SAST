import express from 'express'
import { registerUser,login,getCurrentUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/register',registerUser)
router.post('/login',login)

router.get('/me',protect,getCurrentUser)

export default router