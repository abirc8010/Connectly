import { Server } from "socket.io"
let connections = {}
let message = {}
let timeOnline = {}

export const initializeSocket = (server) => {
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"],
            allowedHeaders:["*"],
            credentials:true
        }
    });
    io.on('connection', (socket) => {
        console.log("connected");
        socket.on("join", (path) => {
            if (connections[path] === undefined)
                connections[path] = []
            connections[path].push(socket.id)
            timeOnline[socket.id] = new Date();
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("online", socket.id);
            }
            if (message[path] !== undefined) {
                for (let a = 0; a < message[path].length; a++) {
                    io.to(socket.id).emit("chat-message", message[path][a]['data'],
                        message[path][a]['sender'], message[path][a]['socket-id-sender']
                    )
                }
            }
        })
        socket.on("signal", (toId, signal) => {
            io.to(toId).emit("signal", socket.id, signal);
        })
        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).reduce(([room, isFound], [roomName, roomConnections]) => {

                if (!isFound && roomConnections.includes(socket.id)) {
                    return [roomName, true];
                }
                return [room, isFound];
            }, [null, false]);
            if (found) {
                if (message[matchingRoom] === undefined)
                    message[matchingRoom] = []
                message[matchingRoom].push({ 'data': data, 'sender': sender, 'socket-id-sender': socket.id })
                for (let a = 0; a < connections[matchingRoom].length; a++) {
                    io.to(connections[matchingRoom][a]).emit("chat-message", data, sender, socket.id)
                }
                connections.forEach((connection) => {
                    io.to(connection).emit("chat-message", data, sender, socket.id);
                })
            }
        })
        socket.on("disconnect", () => {
            var diffTime = Math.abs(new Date() - timeOnline[socket.id] - new Date());
            var FindKey
            for (const [key, value] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                if (value.includes(socket.id)) {
                    FindKey = key;
                    for (let a = 0; a < connections[FindKey].length; a++) {
                        io.to(connections[FindKey][a]).emit("user-left", socket.id);
                    }
                    var index=connections[FindKey].indexOf(socket.id);
                    connections[FindKey].splice(index,1);
                    if(connections[FindKey].length==0){
                        delete connections[FindKey];
                    }
                }
            }
        })
    })
}