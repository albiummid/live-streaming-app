import appConfig from "@/app.config";
import { io } from "socket.io-client";
let socket = io(appConfig.webSocket.API_ROUTE, appConfig.webSocket.options);

export default socket;
