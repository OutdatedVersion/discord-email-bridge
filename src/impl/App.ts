import { IHttpServer } from '../api';

export default class App {
  constructor(private httpServer: IHttpServer) {}

  public async start(): Promise<void> {
    await this.httpServer.start(this.getHttpPort());
  }

  private getHttpPort() {
    return parseInt(process.env.PORT || '2000');
  }
}
