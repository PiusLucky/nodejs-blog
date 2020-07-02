const express = require('express')
const mongoose = require('mongoose')
const blogArticle = require('./models/blog_models')
const aboutBlogger = require('./models/about_models')
const blogArticleRouter = require('./routes/blog_routes')
const aboutRouter = require('./routes/about_routes')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await blogArticle.find().sort({ published: 'desc' })
  const total_post = articles.length
  return res.render('blog_views/index', { articles: articles, total_post: total_post })
})

app.get('/about', async (req, res) => {
  const about_author = await aboutBlogger.find().sort({ date_time_track: 'desc' })
  return res.render('about_views/about', { about_author: about_author })
})
// for linking css/other static assets
app.use(express.static(__dirname + '/public'))
app.use('/', blogArticleRouter)
app.use('/about', aboutRouter)

app.listen(5000)