import { IHttpServer } from '../api';
import { Logger } from 'pino';

export default class App {
  constructor(private logger: Logger, private httpServer: IHttpServer) {}

  public async start(): Promise<void> {
    await this.httpServer.start(this.getHttpPort());
  }

  private getHttpPort() {
    return parseInt(process.env.PORT || '2000');
  }
}
