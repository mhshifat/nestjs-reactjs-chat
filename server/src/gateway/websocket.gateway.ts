import { Inject, ParseIntPipe } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { IConversationsService } from "src/conversations/conversations.types";
import { Services } from "src/utils/constants";
import { AuthenticatedSocket } from "src/utils/interfaces";
import { Conversation, Message } from "src/utils/typeorm";
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

  @SubscribeMessage("onConversationJoin")
  handleConversationJoin(
    @MessageBody("conversationId", ParseIntPipe) conversationId: number,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.join(String(conversationId));
    client.to(String(conversationId)).emit("userJoin");
  }

  @SubscribeMessage("onConversationLeave")
  handleConversationLeave(
    @MessageBody("conversationId", ParseIntPipe) conversationId: number,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.leave(String(conversationId));
    client.to(String(conversationId)).emit("userLeave");
  }

  @SubscribeMessage("onUserTyping")
  handleUserTyping(
    @MessageBody("conversationId", ParseIntPipe) conversationId: number,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.to(String(conversationId)).emit("onUserTyping");
  }

  @SubscribeMessage("onUserStopedTyping")
  handleUserStopedTyping(
    @MessageBody("conversationId", ParseIntPipe) conversationId: number,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.to(String(conversationId)).emit("onUserStopedTyping");
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

  @OnEvent("conversations.create")
  handleConversationCreateEvent(payload: Conversation) {
    this.sessionManager.getUserSocket(payload.recipient.id)?.emit("onConversation", payload);
  }

  @OnEvent("message.delete")
  handleMessageDeleteEvent({ message, conversation }: { message: Message, conversation: Conversation }) {
    this.sessionManager.getUserSocket(message.author.id)?.emit("onMessageDelete", { message, conversation });
    if (message.author.id === conversation.recipient.id) {
      this.sessionManager.getUserSocket(conversation.creator.id)?.emit("onMessageDelete", { message, conversation });
    } else {
      this.sessionManager.getUserSocket(conversation.recipient.id)?.emit("onMessageDelete", { message, conversation });
    }
  }
}