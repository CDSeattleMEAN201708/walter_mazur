var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './client')))

app.set('views', path.join(__dirname,'./client/views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/message_board_db')

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
  message: {type: String, required: true},
  name: {type: String, required: true, minlength: 4},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

var CommentSchema = new mongoose.Schema({
  _message: {type: Schema.Types.ObjectId, ref:'Message'},
  name: {type: String, required: true, minlength: 4},
  comment: {type: String, required: true}
}, {timestamps: true})

mongoose.model('Message', MessageSchema)
mongoose.model('Comment', CommentSchema)

var Message = mongoose.model('Message')
var Comment = mongoose.model('Comment')

app.get('/', (req,res)=>{
  Message.find({}).populate('comments')
  .exec( (err, messages)=>{
    if(err){
      console.log("Something went wrong")
    } else{
      console.log(messages)
      res.render('index', {messages: messages})
    }
  })
})

app.post('/message', (req,res)=>{
  console.log("POST DATA: ", req.body)
  var message = new Message({message: req.body.message, name: req.body.name})
  message.save((err)=>{
    if(err){
      console.log("Something went wrong")
    }else {
      console.log("Succesfully added a message")
      res.redirect('/')
    }
  })
})

app.post('/comment/:id', (req,res)=>{
  console.log("POST DATA: ", req.body)
  Message.findOne({_id: req.params.id}, (err, message)=>{
    var comment = new Comment({comment: req.body.comment, name: req.body.name})
    message.comments.push(comment);
    comment.save((err)=>{
      message.save((err)=>{
        if(err){ console.log('Error')}
        else { res.redirect('/')}
      })    
    })
  })
})

app.listen(8000, ()=>{
  console.log('listening on port 8000')
})
