import { IDiscordBotConfig } from '../discord';
import { IHttpConfig } from '../http';
import { ISesEmailSenderConfig } from '../email/ISesEmailSenderConfig';

export interface IConfig {
  http: IHttpConfig;
  discord: IDiscordBotConfig;
  email: {
    ses: ISesEmailSenderConfig;
  };
}
