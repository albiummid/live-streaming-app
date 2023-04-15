import { Peer } from "peerjs";

export const peer = new Peer(undefined, {
  path: "/",
  host: "localhost",
  port: 8000,
});
