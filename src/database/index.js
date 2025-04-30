const db = require('./pool')

async function addProduct(
  product_name,
  product_description,
  product_slug,
  product_price,
  product_availability,
  product_location,
  tag_label,
  image
) {
  const client = await db.pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('INSERT INTO products (product_name, product_description, product_slug, product_price, product_availability, product_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id')
  }
  
}

/** Return a tag id if it exists, else create a new tag and return its id.  */
async function findOrCreateTag(tag_label, client = null) {
  const executor = client || db

  const result = await executor.query('SELECT tag_id FROM tags WHERE label = $1', [tag_label])
  if (result.rows.length > 0) {
    return result.rows[0].tag_id
  }
  const insert = await executor.query('INSERT INTO tags (label) VALUES ($1) RETURNING tag_id', [tag_label])
  return insert.rows[0].tag_id
}

/** Return a product slug. */
async function slugify(product_name = '', client = null) {
  const executor = client || db
  const baseSlug = product_name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')

  const result = await executor.query("SELECT product_slug FROM products WHERE product_slug LIKE $1", [`${baseSlug}%`])
  const existingSlugs = result.rows.map(row => row.product_slug)

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

module.exports = {
  addProduct,
  findOrCreateTag,
  slugify,
}
