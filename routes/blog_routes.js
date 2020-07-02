const express = require('express')
const blogArticle = require('./../models/blog_models')
const router = express.Router()

//show form by get()
router.get('/new', (req, res) => {
  res.render('blog_views/new', { article: new blogArticle() })
})

// post form data by post()
router.post('/', async (req, res, next) => {
  req.article = new blogArticle()
  next()
}, saveInstanceAndRedirect('new'))

// shows form with data ready for edit
router.get('/edit/:id', async (req, res) => {
  const article = await blogArticle.findById(req.params.id)
  res.render('blog_views/edit', { article: article })
})

// detail page of a specific post based on unique slug
router.get('/:slug', async (req, res) => {
  const article = await blogArticle.findOne({ slug: req.params.slug })
  if (article == null) return res.redirect('/')
  res.render('blog_views/show', { article: article })
})

// edit existing by put()
router.put('/:id', async (req, res, next) => {
  req.article = await blogArticle.findById(req.params.id)
  next()
}, saveInstanceAndRedirect('edit'))

// delete existing by put()
router.delete('/:id', async (req, res) => {
  await blogArticle.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

// a function to save blogArticle 
// instance & redirect
function saveInstanceAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.body = req.body.body
    article.status = req.body.status
    try {
      article = await article.save()
      res.redirect(`/${article.slug}`)
    } catch (e) {
      res.render(`blog_views/${path}`, { article: article })
    }
  }
}


module.exports = router