var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './client')))

app.set('views', path.join(__dirname,'./client/views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/quotes_db')

var QuoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  date: Date,
})

mongoose.model('Quote', QuoteSchema)

var Quote = mongoose.model('Quote')

app.get('/', (req,res)=>{
  res.render('index')
})

app.post('/quotes', (req,res)=>{
  console.log("POST DATA", req.body)

  var quote = new Quote({quote: req.body.quote, author: req.body.author, date: req.body.date})

  quote.save((err)=>{
    if(err){
      console.log("Something went wrong")
    } else {
      console.log("succesfully added a quote")
      res.redirect('/quotes')
    }
  })
})

app.get('/quotes', (req,res)=>{
  Quote.find({}, (err, quotes)=>{
    if(err){
      console.log("Something went wrong")
    } else {
      console.log(quotes)
      res.render('quotes', {quotes:quotes})
  }})
})

app.listen(8000, ()=>{
  console.log('listening on port 8000')
})
