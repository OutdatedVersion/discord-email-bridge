import { IHttpServer, IEmailProcessor } from '../api';
import { Logger } from 'pino';
import { IDiscordBot } from '../api/discord';

export default class App {
  constructor(
    private logger: Logger,
    private httpServer: IHttpServer,
    private discordBot: IDiscordBot,
    private emailProcessor: IEmailProcessor<any>
  ) {}

  public async start(): Promise<void> {
    this.httpServer.registerProcesor('/ses', this.emailProcessor);

    await this.httpServer.start(this.getHttpPort());
    await this.discordBot.start(this.getDiscordToken());
  }

  private getDiscordToken() {
    const token = process.env.DISCORD_TOKEN;

    if (token) {
      return token;
    }

    throw new Error('Missing required env variable: DISCORD_ENV');
  }

  private getHttpPort() {
    return parseInt(process.env.PORT || '2000');
  }
}
