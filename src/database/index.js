/*===============================================
File: index.js
Author: Steven Thomas
Date: May 01, 2025
Purpose: Index file for database interactions
===============================================*/
const db = require('./pool')
const { processAndUploadImage } = require('../services/imageService')

/** Add a product to the database */
async function addProduct(
  product_name,
  product_description,
  product_price,
  product_availability,
  product_location,
  tag_labels,
  image,
  image_originalname
) {
  let product_slug;
  const client = await db.pool.connect()
  try {
    const image_url = await processAndUploadImage(image, image_originalname)
    product_slug = await slugify(product_name, client) // Produce a slug using time and the product name

    await client.query('BEGIN')
    const result = await client.query(
      'INSERT INTO products (product_name, product_description, product_slug, product_price, product_availability, product_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id',
      [
        product_name,
        product_description,
        product_slug,
        product_price,
        product_availability,
        product_location,
      ]
    )
    if (!result.rows.length) throw new Error('Insert failed 😭')
    const product_id = result.rows[0].product_id
    for (const label of tag_labels) {
      const tag_id = await findOrCreateTag(label, client)
      await client.query(
        'INSERT INTO products_tags (product_id, tag_id) VALUES ($1, $2)',
        [product_id, tag_id]
      )
    }


    await client.query('INSERT INTO images (image_url, product_id) VALUES ($1, $2) RETURNING image_id', [image_url, product_id])

    await client.query('COMMIT')
  } catch (err) {
    console.log('Error adding product:', err)
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
  return product_slug
}

/** Return a tag id if it exists, else create a new tag and return its id.  */
async function findOrCreateTag(tag_label, client = null) {
  const executor = client || db

  const result = await executor.query(
    'SELECT tag_id FROM tags WHERE tag_label = $1',
    [tag_label]
  )
  if (result.rows.length > 0) {
    return result.rows[0].tag_id
  }
  const insert = await executor.query(
    'INSERT INTO tags (tag_label) VALUES ($1) RETURNING tag_id',
    [tag_label]
  )
  return insert.rows[0].tag_id
}

/** Return a product slug. */
async function slugify(product_name, client = null) {
  const executor = client || db
  const baseSlug = product_name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')

  const result = await executor.query(
    'SELECT product_slug FROM products WHERE product_slug LIKE $1',
    [`${baseSlug}%`]
  )
  const existingSlugs = result.rows.map((row) => row.product_slug)

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug
  }

  let slug = baseSlug
  let counter = 1

  do {
    slug = `${baseSlug}-${counter++}`
  } while (existingSlugs.includes(slug))

  return slug
}

async function getProductBySlug(slug) {
  const query = `SELECT 
        p.product_name,
        p.product_description,
        p.product_price,
        p.product_availability,
        p.product_location,
        i.image_url,
        array_agg(t.tag_label ORDER BY t.tag_label) AS tags
      FROM products p
      JOIN products_tags pt ON pt.product_id = p.product_id
      JOIN tags t ON t.tag_id = pt.tag_id
      JOIN images i ON i.product_id = p.product_id
      WHERE p.product_slug = $1
      GROUP BY 
        p.product_name, 
        p.product_description, 
        p.product_price, 
        p.product_availability, 
        p.product_location, 
        i.image_url;
    `
  const result = await db.query(query, [slug])
  if (!result.rows.length) throw new Error('Product not found')
  return result.rows[0]
}

async function getAllProducts() {
  const query = 'SELECT * FROM products'
  const result = await db.query(query)
  return result.rows
}

module.exports = {
  addProduct,
  findOrCreateTag,
  slugify,
  getProductBySlug,
  getAllProducts
}
