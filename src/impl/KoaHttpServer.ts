import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-pino-logger';
import { IHttpServer } from '../api';
import { Server } from 'http';
import { Logger } from 'pino';

export class KoaHttpServer implements IHttpServer {
  private readonly koa = new Koa();

  constructor(private logger: Logger) {
    this.koa.use(koaLogger());
    this.koa.use(bodyParser());
  }

  public async start(port: number): Promise<Server> {
    this.logger.info('Starting HTTP server (via Koa) on :%d', port);

    return this.koa.listen(port);
  }

  public registerBodyHook(
    path: string,
    hook: (data: any) => Promise<void>
  ): void {
    this.koa.use(async context => {
      if (context.path !== path) {
        return;
      }

      await hook(context.request.body);

      context.status = 204;
    });
  }
}
