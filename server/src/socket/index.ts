import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer;

export function setupSocket(server: Server) {
  io = new SocketIOServer(server);

  io.on("connection", (socket: Socket) => {
    console.log("Socket client connected");

    socket.on("disconnect", () => {
      console.log("Socket client disconnected");
    });
  });

  return io;
}
