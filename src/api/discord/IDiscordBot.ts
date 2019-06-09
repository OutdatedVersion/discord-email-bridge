import { RichEmbed, Message } from 'discord.js';

export interface IDiscordBot {
  start(token: string): Promise<void>;
  sendMessage(embed: RichEmbed): Promise<void>;
  registerReceiveHook(hook: (message: Message) => void): void;
}
