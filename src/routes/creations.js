const router = require('express').Router()
const multer = require('multer')
// const AWS = require('aws-sdk')
const fs = require('fs')
const creationsController = require('../controllers/creationsController')

const upload = multer({dest: 'uploads/'})

const spacesEndpoint = new AWS.Endpoint('sfo2.digitaloceanspaces.com')
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET
  }
})

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

module.exports = router
