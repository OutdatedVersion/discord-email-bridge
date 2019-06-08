import { RichEmbed } from 'discord.js';

export interface IDiscordBot {
  start(token: string): Promise<void>;
  sendMessage(embed: RichEmbed): Promise<void>;
}
