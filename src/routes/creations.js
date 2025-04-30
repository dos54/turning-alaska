const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const creationsController = require('../controllers/creationsController')
const upload = multer({ storage: multer.memoryStorage() })

router.get('/new', creationsController.buildUploadForm)

router.post('/image', upload.single('image'), async (req, res) => {
  const fileContent = fs.readFileSync(req.file.path)
  const fileName = `images/${Date.now()}-${req.path.originalname}`

  const params = {
    Bucket: process.env.DO_BUCKET_ENDPOINT,
    Key: fileName,
    Body: fileContent,
    ACL: 'public-read',
    ContentType: req.file.mimetype,
  }

  try {
    const data = await s3.upload(params).promise()
    fs.unlinkSync(req.file.path)
    res.send(`File uploaded successfully: ${data.Location}`)
  } catch (err) {
    console.error('Upload failed', err)
    res.status(500).send('Upload failed')
  }
})

router.post(
  '/uploadImage',
  upload.single('image'),
  creationsController.uploadImage
)

module.exports = router
