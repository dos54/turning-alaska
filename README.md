# Project deets for TurningAlaska
This document is meant to include details for the TurningAlaska website, including specifications
## To be built using
- Express
- EJS & SSR
- Postgresql via render
- DigitalOcean Spaces for image storage
- Stripe for payment

## Pages
- Home
- Items
- Cart / checkout
- About me
- Contact page
- Admin page

### Home
- Intro, photo
- News
- Highlighted / new items

### Items
- Tags
- Gallery (Items including photo, price, list of tags, etc.)
- When clicking on an item, you are brought to the page for that item
  - Item page may include more than one photo.

### About Me
- Include some basic information such as a bio, etc.

### Contact page
- Include contact information, as well as a way to draft or send feedback or requests

### Admin page
- A way to log in
- A form to upload new images, items, etc
- A way to update/edit existing items
- A way to see feedback and orders
- Easy access and views for items in inventory

## What systems will I need to build out?
### Database
The database will include the following schemas:
- Product
  - Product ID
  - Name
  - Description
  - Slug
  - Image URL
  - Price
  - Availability (Has it sold already?)
  - Location (ie, some items will be shown that are already at a physical store)
- Tag
  - tagId
  - label
- product_tags
  - product_id
  - tag_id
- image
  - id
  - product_id
  - url
- Order
  - stripe_payment_intent
  - status
  - amount
  - timestamp
  - email
- Cart
  - List of items in the cart
  - Cart ID
  - Not user ID, but something to remember the user
- User
  - A list of admins? (Maybe. Will use OAuth2 for login though, for security)

The most important and first database will be products.
~~Maybe I will use upload thing for the images?~~ I am going to use Spaces by Digital Oceans https://cloud.digitalocean.com/spaces/turning-alaska?i=de476f

#### Functions for the database
- All of the CRUD operations

### Server
- Views for each page
- Error page
- Routes
- Stripe integration

### Middleware
- Something for auth
- Error handling ?