import { IHttpServer, IEmailProcessor } from '../api';
import { Logger } from 'pino';
import { IDiscordBot } from '../api/discord';
import { IParsedEmailMessage } from '../api/processor';
import { RichEmbed } from 'discord.js';
import { IConfig } from '../api/config/IConfig';

export default class App {
  constructor(
    private logger: Logger,
    private config: IConfig,
    private httpServer: IHttpServer,
    private discordBot: IDiscordBot,
    private emailProcessor: IEmailProcessor<any>
  ) {}

  public async start(): Promise<void> {
    this.httpServer.registerBodyHook(
      '/ses',
      this.processAndSendMessage.bind(this)
    );

    await this.httpServer.start(this.config.http.port);
    await this.discordBot.start(this.config.discord.token);
  }

  private async processAndSendMessage(data: any) {
    const parsedEmail = await this.emailProcessor.process(data);

    await this.discordBot.sendMessage(this.buildDiscordMessage(parsedEmail));
  }

  private buildDiscordMessage(message: IParsedEmailMessage): RichEmbed {
    const embed = new RichEmbed();

    embed.setTimestamp(message.timestamp);
    embed.setDescription(message.content);
    // TODO: Should be configurable
    embed.setAuthor("Ethan's Email");

    return embed;
  }
}
