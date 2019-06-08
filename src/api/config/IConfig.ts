import { IDiscordBotConfig } from '../discord';
import { IHttpConfig } from '../http';

export interface IConfig {
  http: IHttpConfig;
  discord: IDiscordBotConfig;
}
