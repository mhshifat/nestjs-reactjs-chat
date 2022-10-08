import { Inject } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { IConversationsService } from "src/conversations/conversations.types";
import { Services } from "src/utils/constants";
import { AuthenticatedSocket } from "src/utils/interfaces";
import { Message } from "src/utils/typeorm";
import { IGatewaySessionManager } from "./gateway.session";

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true
  }
})
export class MessagingGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEAWAY_SESSION) private readonly sessionManager: IGatewaySessionManager,
    @Inject(Services.CONVERSATIONS) private readonly conversationsService: IConversationsService
  ) { }

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    this.sessionManager.setUserSocket(socket.user.id, socket);
    socket.emit("connected")
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("createMessage")
  handleCreateMessage(@MessageBody() data: any) {
    // console.log({ data });
  }

  @SubscribeMessage("onUserTyping")
  async handleOnUserTyping(@MessageBody() data: { conversationId: number }) {
    // console.log({ data });
  }

  @OnEvent("message.create")
  handleMessageCreateEvent(payload: Message) {
    const { author, conversation: { recipient, creator } } = payload;
    this.sessionManager.getUserSocket(author.id)?.emit("onMessage", payload);
    if (author.id === recipient.id) {
      this.sessionManager.getUserSocket(creator.id)?.emit("onMessage", payload);
    } else {
      this.sessionManager.getUserSocket(recipient.id)?.emit("onMessage", payload);
    }
  }
}