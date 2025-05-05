const {
  addProduct,
  getProductBySlug,
  getAllProducts,
} = require('../database/index')
const { processAndUploadImage } = require('../services/imageService')
const { isAdmin } = require('../utilities/isAdmin')

let galleryController = {}

/** Build the form for adding products */
galleryController.buildUploadForm = async (req, res, next) => {
  try {
    res.render('upload-form', {
      title: 'Create new product',
    })
  } catch (err) {
    next(err)
  }
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
    next(err)
  }
}

/** Build the gallery page */
galleryController.buildGalleryPage = async (req, res, next) => {
  try {
    const products = await getAllProducts()
    res.render('gallery', { title: 'Gallery', products })
  } catch (err) {
    next(err)
  }
}

/** Build the page for a single product */
galleryController.buildProductPage = async (req, res, next) => {
  try {
    const slug = req.params.slug
    const product = await getProductBySlug(slug)
  
    res.render('product-page', {
      title: slug,
      product: product,
      slug: slug,
    })
  } catch (err) {
    err.status = 404
    next(err)
  }
}

/** Upload an image */
galleryController.uploadImage = async (req, res, next) => {
  try {
    const { originalname, buffer } = req.file
    const imageUrl = await processAndUploadImage(buffer, originalname)
    console.log(`Image uploaded to ${imageUrl}`)
  } catch (err) {
    next(err)
  }
}



module.exports = galleryController
