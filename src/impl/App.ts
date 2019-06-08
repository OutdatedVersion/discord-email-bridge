import { IHttpServer, IEmailProcessor } from '../api';
import { Logger } from 'pino';

export default class App {
  constructor(
    private logger: Logger,
    private httpServer: IHttpServer,
    private emailProcessor: IEmailProcessor<any>
  ) {}

  public async start(): Promise<void> {
    this.httpServer.registerProcesor('/ses', this.emailProcessor);

    await this.httpServer.start(this.getHttpPort());
  }

  private getHttpPort() {
    return parseInt(process.env.PORT || '2000');
  }
}
