const router = require('express').Router()
const homeController = require('../controllers/homeController')
const { requiresAuth } = require('express-openid-connect')

router.use('/gallery', require('./gallery'))
router.get('/', homeController.renderHome)
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

module.exports = router
