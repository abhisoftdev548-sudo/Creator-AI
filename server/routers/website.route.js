import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import websiteController from '../controllers/website.controller.js'

const router = express.Router()

router.post('/generate', authMiddleware.validateUser, websiteController.generateWebsite)
router.post('/update/:id', authMiddleware.validateUser, websiteController.changes)
router.get("/get-by-id/:id", authMiddleware.validateUser, websiteController.getWebsiteById)
router.get("/get-all", authMiddleware.validateUser, websiteController.getAll)
router.get('/deploy/:id', authMiddleware.validateUser, websiteController.deploy)
router.get('/get-by-slug/:slug', websiteController.getBySlug)
export default router