const router = require('express').Router()
const multer = require('multer')
const galleryController = require('../controllers/galleryController')
const upload = multer({ storage: multer.memoryStorage() })

router.get('/new', galleryController.buildUploadForm)

router.post('/new', upload.single('image'), galleryController.createProduct)
router.get('/:slug', galleryController.buildProductPage)

router.post(
  '/uploadImage',
  upload.single('image'),
  galleryController.uploadImage
)

router.get('/', galleryController.buildGalleryPage)

module.exports = router
