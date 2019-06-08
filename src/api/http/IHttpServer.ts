import { Server } from 'http';
import { IEmailProcessor } from '../processor';

export interface IHttpServer {
  start(port: number): Promise<Server>;
  registerProcesor(path: string, processor: IEmailProcessor<any>): void;
}
