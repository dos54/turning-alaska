// Require statements
const router = require('express').Router()
const multer = require('multer')
const galleryController = require('../controllers/galleryController')
const upload = multer({ storage: multer.memoryStorage() })
const { requiresAuth } = require('express-openid-connect')

// Routes
router.get('/new', requiresAuth(), galleryController.buildUploadForm)
router.get('/:slug', galleryController.buildProductPage)

router.post(
  '/new',
  requiresAuth(),
  upload.single('image'),
  galleryController.createProduct
)
// Route to upload an image
router.post(
  '/uploadImage',
  requiresAuth(),
  upload.single('image'),
  galleryController.uploadImage
)

router.get('/', galleryController.buildGalleryPage)

module.exports = router
