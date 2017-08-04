$(document).ready(()=>{
  var socket = io.connect();
    var current_user;

    var new_user = function() {
      var name = prompt("Please enter your name to chat");
      socket.emit("page_load", {user: name});
    }

    new_user();

    socket.on("existing_user", function(data){
      $("#error").html(data.error)
      new_user();
    })

    socket.on("load_messages", function(data){
      $("#error").html("") //resetting the error message
      current_user = data.current_user;
      var messages = data.messages;
      var messages_thread = "";

      for (var i = 0; i < messages.length; i++){
        messages_thread += "<p>" + messages[i].name + ": " + messages[i].message + "</p>";
      }

      $("#message_board").append(messages_thread);
    })

    socket.on("load_users", (data)=>{
      var users = data
      var users_thread = "";

      for(var i = 0;i < users.length;i++){
        users_thread += "<li>"+users[i]+"</li>"
      }
      $("#users_list").html("")
      $('#users_list').append(users_thread);
    })

    $("#new_message").submit(function(){
      socket.emit("new_message", {message: $("#message").val(), user: current_user})
      return false;
    })

    socket.on("post_new_message", function(data) {
      $("#message_board").append("<p>" + data.user + ": " + data.new_message + "</p>");
    })

    $('#leave').click(()=>{
      socket.emit('disconnect', current_user)
    })


})
