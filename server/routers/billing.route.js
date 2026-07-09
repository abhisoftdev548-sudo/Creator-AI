import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import billingController from '../controllers/billing.controller.js';

const router = express.Router();

router.post('/create-order', authMiddleware.validateUser, billingController.createOrder);
router.post('/verify-payment', authMiddleware.validateUser, billingController.verifyPayment);

export default router;
