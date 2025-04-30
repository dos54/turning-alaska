let homeController = {}

homeController.renderHome = (req, res) => {
  res.render('home', {
    title: 'Welcome!',
  })
}

module.exports = homeController
