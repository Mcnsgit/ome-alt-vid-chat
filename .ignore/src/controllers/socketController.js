
// socketController.js
let SERVER = process.env.NODE_ENV === 'production' 
  ? "https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com" 
  : "http://localhost:3000";

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: [SERVER, "http://localhost:5173"],
      methods: ["GET", "POST"]
    }
  });

  const STATIC_CHANNELS = [{ 

   }];
    io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
        console.log('new client connected');
        socket.emit('connection', null);
        socket.on('channel-join', id => {
            console.log('channel join', id);
            STATIC_CHANNELS.forEach(c => {
                if (c.id === id) {
                    if (c.sockets.indexOf(socket.id) == (-1)) {
                        c.sockets.push(socket.id);
                        c.participants++;
                        io.emit('channel', c);
                    }
                } else {
                    let index = c.sockets.indexOf(socket.id);
                    if (index != (-1)) {
                        c.sockets.splice(index, 1);
                        c.participants--;
                        io.emit('channel', c);
                    }
                }
            });
    
            return id;
        });
        socket.on('send-message', message => {
            io.emit('message', message);
        });
    
        socket.on('disconnect', () => {
            STATIC_CHANNELS.forEach(c => {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            });
        });
    
    });
    
    
    /**
     * @description This methos retirves the static channels
    */
   app.get('/getChannels', (req, res) => {
       res.json({
           channels: STATIC_CHANNELS
        })
    });
}

return {
getChannels: (req, res) => res.json({ channels: STATIC_CHANNELS })
};


