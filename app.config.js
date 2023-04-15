const configs = {
  development: {
    API_HOST: "http://localhost:8001/api",
    peerServer: {
      host: "localhost",
      port: 8000,
      path: "/",
    },
    webSocket: {
      API_ROUTE: "http://localhost:8001",
      options: {
        path: "/socket.io",
        transports: ["websocket"],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttemps: 10,
      },
    },
  },
  production: {
    API_HOST: "http://localhost:8001/api",
    peerServer: {
      host: "localhost",
      port: 8000,
      path: "/",
    },
    webSocket: {
      API_ROUTE: "http://localhost:8000",
      options: {
        path: "/socket.io",
        transports: ["websocket"],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false,
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttemps: 10,
      },
    },
  },
};

export const { development: devConfigs, production: prodConfigs } = configs;

export default configs["development"];
