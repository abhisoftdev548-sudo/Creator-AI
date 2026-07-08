import express from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()


router.get('/logout', authMiddleware.validateUser,  authController.logout)
router.post('/google-auth', authController.googleAtuh)


export default router;