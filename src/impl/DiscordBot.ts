import Discord, {
  Channel,
  GuildChannel,
  Guild,
  TextChannel,
  MessageEmbed,
  RichEmbed,
  Message
} from 'discord.js';
import { IDiscordBot, IDiscordBotConfig } from '../api/discord';
import { Logger } from 'pino';

export class DiscordBot implements IDiscordBot {
  private readonly client = new Discord.Client();

  constructor(private logger: Logger, private config: IDiscordBotConfig) {}

  public async start(token: string): Promise<void> {
    await this.client.login(token);

    this.logger.info('Logged into Discord as %s', this.client.user.username);
  }

  public async sendMessage(embed: RichEmbed): Promise<void> {
    const channel = this.getMainChannel();

    await channel.send({ embed });
  }

  public registerReceiveHook(hook: (message: Message) => void): void {
    this.client.on('message', hook);
  }

  private getMainChannel(): TextChannel {
    const channel = this.client.channels.get(this.config.channelId);

    if (!channel) {
      throw new Error(`Not a part of channel: ${this.config.channelId}`);
    }

    if (channel.type !== 'text') {
      throw new Error(
        `Channel, ${channel.id}, has invalid type: ${channel.type}`
      );
    }

    return channel as TextChannel;
  }
}
