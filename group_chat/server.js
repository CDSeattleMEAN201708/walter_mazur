const express = require('express')
const path = require("path")
const bodyParser = require('body-parser');
const app = express()

const PORT = 8000
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,"./client")))

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

const server = app.listen(PORT, ()=> {
  console.log('listening on port ${PORT}')
})

const io = require('socket.io').listen(server)

var users = [];

var messages = [];

var is_user = function(user) {
  var users_count = users.length;

  for (var i = 0; i < users_count; i++) {
    if (user == users[i]) {
      return true;
    }
  }
  return false;
}

io.sockets.on("connection", (socket)=>{
   socket.on("page_load", (data)=>{
     if(is_user(data.user) === true) {
       socket.emit("existing_user", {error: "This user already exits"})
     } else {
       users.push(data.user);
       socket.emit("load_messages", {current_user: data.user, messages: messages})
       io.emit('load_users',users)
     }
   })

   socket.on("new_message", (data)=>{
     messages.push({name: data.user, message: data.message})
     io.emit("post_new_message", {new_message: data.message, user: data.user})
   })

   socket.on('disconnect', (data)=>{
     console.log('user disconnected')
     for(let i =0;i<users.length;i++){
       if(users[i] == data){
         users.pop(i)
         socket.emit('load_users', users)
         break;
       } else {
         console.log("user not found")
       }
     }
   })
 })

 app.get("/", function(request, response){
   response.render("index")
 })
