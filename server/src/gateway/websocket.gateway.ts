import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"],
  }
})
export class MessagingGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]) {
    client.emit("connected")
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("createMessage")
  handleCreateMessage(@MessageBody() data: any) {
    console.log({ data });
  }

  @OnEvent("message.create")
  handleMessageCreateEvent(payload: any) {
    this.server.emit("onMessage", payload);
  }
}