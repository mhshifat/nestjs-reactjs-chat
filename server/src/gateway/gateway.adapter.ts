import { IoAdapter } from "@nestjs/platform-socket.io"
import * as cookieParser from "cookie-parser";
import { AuthenticatedSocket } from "../utils/interfaces";
import * as Cookie from "cookie";
import { getRepository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { User, Session } from "src/utils/typeorm";

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const sessionRepo = getRepository(Session);
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie } = socket.handshake.headers;
      if (!cookie) return next(new Error("Not Authenticated"));
      const { CHAT_APP_SESSION_ID } = Cookie.parse(cookie);
      if (!CHAT_APP_SESSION_ID) return next(new Error("Not Authenticated"));
      const signedCookie = cookieParser.signedCookie(CHAT_APP_SESSION_ID, process.env.COOKIE_SECRET);
      if (!signedCookie) return next(new Error("Not Authenticated"));
      const sessionDB = await sessionRepo.findOne({ id: signedCookie });
      const userDB = plainToInstance(User, JSON.parse(sessionDB.json).passport.user);
      socket.user = userDB;
      next();
    });

    return server;
  }
}