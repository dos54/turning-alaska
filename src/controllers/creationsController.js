const db = require('../database/pool')

let creationsController = {}

creationsController.buildUploadForm = async (req, res, next) => {
  res.render('upload-form', {
    title: 'Create new product'
  })
}

creationsController.createProduct = async (req, res, next) => {
  
}

module.exports = creationsController