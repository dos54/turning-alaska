// Require statements
const router = require('express').Router()
const multer = require('multer')
const galleryController = require('../controllers/galleryController')
const upload = multer({ storage: multer.memoryStorage() })
const { requiresAdmin } = require('../middleware/requiresAdmin')

// Routes
router.get('/new', requiresAdmin, galleryController.buildUploadForm)
router.get('/:slug', galleryController.buildProductPage)

router.post(
  '/new',
  requiresAdmin,
  upload.single('image'),
  galleryController.createProduct
)
// Route to upload an image
router.post(
  '/uploadImage',
  requiresAdmin,
  upload.single('image'),
  galleryController.uploadImage
)

router.get('/', galleryController.buildGalleryPage)

module.exports = router
