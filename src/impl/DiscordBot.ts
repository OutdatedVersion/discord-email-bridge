import Discord from 'discord.js';
import { IDiscordBot } from '../api/discord';
import { Logger } from 'pino';

export class DiscordBot implements IDiscordBot {
  private readonly client = new Discord.Client();

  constructor(private logger: Logger) {}

  public async start(token: string): Promise<void> {
    await this.client.login(token);

    this.logger.info('Logged into Discord as %s', this.client.user.username);
  }

  public async sendMessage(content: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
