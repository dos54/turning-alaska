const router = require('express').Router()
const homeController = require('../controllers/homeController')

router.use('/gallery', require('./gallery'))
router.get('/', homeController.renderHome)

module.exports = router
