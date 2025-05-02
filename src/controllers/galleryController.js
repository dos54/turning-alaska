const {
  addProduct,
  getProductBySlug,
  getAllProducts,
} = require('../database/index')
const { processAndUploadImage } = require('../services/imageService')

let galleryController = {}

/** Build the form for adding products */
galleryController.buildUploadForm = async (req, res, next) => {
  res.render('upload-form', {
    title: 'Create new product',
  })
}

/** Create a new product */
galleryController.createProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_availability,
      product_location,
      tag_labels,
    } = req.body

    const { originalname, buffer } = req.file
    const product_slug = await addProduct(
      product_name,
      product_description,
      parseFloat(product_price),
      !!product_availability,
      product_location,
      tag_labels?.split(',').map((s) => s.trim()) ?? [],
      buffer,
      originalname
    )
    res.redirect(`/gallery/${product_slug}`)
  } catch (err) {
    throw err
  }
}

/** Build the gallery page */
galleryController.buildGalleryPage = async (req, res, next) => {
  const products = await getAllProducts()
  res.render('gallery', { title: 'Gallery', products })
}

/** Build the page for a single product */
galleryController.buildProductPage = async (req, res, next) => {
  const slug = req.params.slug
  console.log(slug)
  const product = await getProductBySlug(slug)

  res.render('product-page', {
    title: slug,
    product: product,
  })
}

/** Upload an image */
galleryController.uploadImage = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file
    const imageUrl = await processAndUploadImage(buffer, originalname)
    console.log(`Image uploaded to ${imageUrl}`)
  } catch (err) {
    throw err
  }
}

module.exports = galleryController
