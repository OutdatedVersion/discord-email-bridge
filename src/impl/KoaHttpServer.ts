import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { IHttpServer } from '../api';
import { Server } from 'http';

export class KoaHttpServer implements IHttpServer {
  private readonly koa = new Koa();

  public async start(port: number): Promise<Server> {
    this.koa.use(bodyParser());

    return this.koa.listen(port);
  }

  public async registerProcessor(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
