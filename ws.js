
const {WebSocketServer} = require('ws');

const db = []

const clients = new Set()

const wss = new WebSocketServer({port : 3000});


wss.on("connection", (socket)=>{
    
    console.log(socket);
    
    console.log('a connection made successfully.');
    
    socket.on("message", (msg)=>{

        msg = JSON.parse(msg)
        
        clients.add(socket);

        db.push(msg)

        for(c of clients){
            c.send(JSON.stringify(db));
        }
        
        
    })
    
    socket.send(JSON.stringify(db));


})

