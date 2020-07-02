const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const DomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = DomPurify(new JSDOM().window)


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  published: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  },
  status: {type: String, required: true, enum: 
    ['Draft', 'Live'], default: 'Live'},
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})




// just like pre_save in django-python. 
// run this logic before saving a model instance
blogSchema.pre('validate', function(next) {
  if (this.title) {
    // strict true allows slugify to remove some wierd characters from the slug
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.body) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.body))
  }

  next()
})

//Export function to create "BlogModel" model class
module.exports = mongoose.model('BlogModel', blogSchema, "MainCollection")
