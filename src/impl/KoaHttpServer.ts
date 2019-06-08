import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-pino-logger';
import { IHttpServer } from '../api';
import { Server } from 'http';
import { Logger } from 'pino';

export class KoaHttpServer implements IHttpServer {
  private readonly koa = new Koa();

  constructor(private logger: Logger) {}

  public async start(port: number): Promise<Server> {
    this.koa.use(koaLogger());
    this.koa.use(bodyParser());

    this.logger.info('Starting HTTP server (via Koa) on :%d', port);

    return this.koa.listen(port);
  }

  public async registerProcessor(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
