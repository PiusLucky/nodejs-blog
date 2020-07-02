const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const DomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = DomPurify(new JSDOM().window)


const aboutSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: false
  },
  github: {
    type: String,
    required: true
  },
  achievements: {
    type: Number,
    min: 1, 
    max: 1000
  },
  date_time_track: {
    type: Date,
    default: Date.now
  },
})


//Export function to create "BlogModel" model class
module.exports = mongoose.model('aboutModel', aboutSchema, "AboutCollection")