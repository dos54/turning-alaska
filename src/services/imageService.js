const sharp = require('sharp')
const { uploadFileToSpaces } = require('../database/spaces')
const path = require('path')

/** Resize and optimize image using Sharp, then upload to the Spaces storage */
async function processAndUploadImage(buffer, originalname) {
  const optimizedBuffer = await sharp(buffer)
    .resize(800)
    .webp({ quality: 80 })
    .toBuffer()

  console.log('Transformed image to webp')

  const baseName = path.parse(originalname).name
  const fileName = `products/${Date.now()}-${baseName}.webp`

  return await uploadFileToSpaces(optimizedBuffer, fileName, 'image/webp')
}

module.exports = { processAndUploadImage }
