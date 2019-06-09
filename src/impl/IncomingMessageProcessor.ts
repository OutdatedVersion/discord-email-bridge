import { Message } from 'discord.js';
import { IEmailSender } from '../api/email/IEmailSender';
import { IDiscordBot } from '../api/discord';
import { Logger } from 'pino';

export class IncomingMessageParser {
  private messages: Message[] = [];

  constructor(
    private logger: Logger,
    private discordBot: IDiscordBot,
    private emailSender: IEmailSender
  ) {}

  public start() {
    this.discordBot.registerReceiveHook(this.acceptMessage.bind(this));

    setInterval(() => this.processQueue(), 5000);
  }

  private async acceptMessage(message: Message) {
    const channel = this.discordBot.getMainChannel();

    if (channel.id !== message.channel.id) {
      return;
    }

    this.messages.push(message);

    this.logger.info(
      'Accepted message into outgoing queue, ID: %s',
      message.id
    );
  }

  private async processQueue() {
    if (this.messages.length === 0) {
      return;
    }

    this.logger.info('Processing %d outgoing messages', this.messages.length);

    let emailContent =
      'Your message digest. All times are in {timezone}. {date}<br/>';

    const messages = this.messages.slice(0);

    this.messages = [];

    for (const { cleanContent, author } of messages) {
      // TODO: turn markdown to html? **bold** to <strong>, etc

      emailContent += `<br/><strong>${
        author.username
      } at {time}:</strong><br/>${cleanContent}`;
    }

    await this.emailSender.send(emailContent);
  }
}
