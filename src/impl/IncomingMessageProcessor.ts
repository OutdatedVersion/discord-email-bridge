import { Message } from 'discord.js';
import { IEmailSender } from '../api/email/IEmailSender';
import { IDiscordBot } from '../api/discord';

export class IncomingMessageParser {
  private messages: Message[] = [];

  constructor(
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
  }

  private async processQueue() {
    if (this.messages.length === 0) {
      return;
    }

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

    this.emailSender.send(emailContent);
  }
}
