import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

@WebSocketGateway(5001, {
  cors: {
    // origin: [process.env.APP_DOMAIN , "https://admin.socket.io"],
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MyGatway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;
  private onlinePlayers: string[] = [];

  onModuleInit() {
    this.server.on('connection', (socket) => {});
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    if (!this.onlinePlayers.includes(client.id)) {
      this.onlinePlayers.push(client.id);
    }
  }

  handleDisconnect(client: Socket) {
    this.onlinePlayers = this.onlinePlayers.filter((ele) => ele != client.id);
    console.log(this.onlinePlayers.length, ' Online Players !!');
    // this.roomsService.removeWaitingUser(client)
  }
}
