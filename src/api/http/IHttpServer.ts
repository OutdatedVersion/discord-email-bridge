import { Server } from 'http';

export interface IHttpServer {
  start(port: number): Promise<Server>;
  registerProcessor(): Promise<void>;
}
