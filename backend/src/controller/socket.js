import { Server } from "socket.io"
export const initializeSocket= (server)=>{
    return new Server(server);
}