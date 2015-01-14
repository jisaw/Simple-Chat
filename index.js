var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var NAME = ""

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
	socket.on('nickname', function(name){
		console.log("[+] " + name + " connected")
	})
	socket.on('chat message', function(msg) {
		socket.broadcast.emit('chat message', msg)
		console.log(msg)
	})

	socket.on('disconnect', function() {
		console.log("[-] User disconnected")
	})
})

http.listen(3000, function() {
	console.log('[+] Listening on port 3000')
})

