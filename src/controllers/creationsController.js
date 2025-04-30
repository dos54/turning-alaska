const db = require('../database/pool')
const {processAndUploadImage} = require('../services/imageService')

let creationsController = {}

creationsController.buildUploadForm = async (req, res, next) => {
  res.render('upload-form', {
    title: 'Create new product'
  })
}

creationsController.createProduct = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file
    const imageUrl = await processAndUploadImage(buffer, originalname) 


  } catch (err) {
    throw err
  }
}

creationsController.uploadImage = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file
    const imageUrl = await processAndUploadImage(buffer, originalname)
    console.log(`Image uploaded to ${imageUrl}`)
  } catch (err) {
    throw err
  }
}


module.exports = creationsController