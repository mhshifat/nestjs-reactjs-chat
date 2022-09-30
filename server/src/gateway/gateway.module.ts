import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { MessagingGateway } from "./websocket.gateway"

@Module({
  providers: [MessagingGateway, {
    provide: Services.GATEAWAY_SESSION,
    useClass: GatewaySessionManager
  }]
})
export class GatewayModule { }
