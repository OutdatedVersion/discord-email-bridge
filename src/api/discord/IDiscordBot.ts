export interface IDiscordBot {
  start(token: string): Promise<void>;
  sendMessage(content: string): Promise<void>;
}
