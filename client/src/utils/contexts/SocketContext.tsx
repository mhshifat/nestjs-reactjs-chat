import { io } from "socket.io-client";
import { createContext } from "react";

// @ts-ignore
export const socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
	withCredentials: true,
});
export const SocketContext = createContext(socket);
