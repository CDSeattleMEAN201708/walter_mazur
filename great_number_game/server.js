const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

const PORT = 8000

app.use(session({secret: 'codingdojorocks'}));
app.use(express.static(path.join(__dirname,"./client")))
app.use(bodyParser.urlencoded({extended:true}))

app.set("views", path.join(__dirname,"./client/views"))
app.set("view engine", "ejs")

app.get('/', (req,res) => {
  if(!req.session.number){
    req.session.number = Math.floor((Math.random()*100)+1)
    req.session.guess = ""
    req.session.status = false
    console.log(req.session.number)
  }
  console.log(req.session)
  res.render('index', {session: req.session})
})

app.post('/reset', (req,res) => {
  req.session.number = Math.floor((Math.random()*100)+1)
  req.session.guess = ""
  req.session.status = false
  res.redirect('/')
})

app.post('/guess', (req,res) => {
  if(req.session.number > req.body.number){
    req.session.guess ="Too Low!"
  } else if (req.session.number < req.body.number) {
    req.session.guess = "Too High!"
  } else if (req.session.number == req.body.number){
    req.session.guess = req.session.number+" was the number!"
    req.session.status = true
  }
  res.redirect('/')
})

app.listen(PORT, ()=> {
  console.log('Listening on port ${PORT}')
})
