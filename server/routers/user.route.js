import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import userController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/get-me', authMiddleware.validateUser, userController.getMe)


export default router