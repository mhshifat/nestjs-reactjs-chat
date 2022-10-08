import { Module } from '@nestjs/common';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { MessagingGateway } from "./websocket.gateway"

@Module({
  imports: [ConversationsModule],
  providers: [MessagingGateway, {
    provide: Services.GATEAWAY_SESSION,
    useClass: GatewaySessionManager
  }]
})
export class GatewayModule { }
