//SocketServer.js

var socketio = require('socket.io');

module.exports = (websocket) => {
	websocket.on('connection', (socket) => {
	  	console.log('A client just joined on', socket.id);
	    socket.emit('newAlert', "Conectado Correctamente");
	    socket.on('active', (user) => {
	    	console.log(user + "is connected")
	    })
	    socket.on('disconnect', function() {
	      console.log('Got disconnect!'+ socket.id);
	   });
	});
}

