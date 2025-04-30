const router = require('express').Router()
const homeController = require('../controllers/homeController')

router.use('/creations', require('./creations'))
router.get('/', homeController.renderHome)

module.exports = router
