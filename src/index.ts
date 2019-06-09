import App from './impl/App';
import pino from 'pino';
import { KoaHttpServer } from './impl/KoaHttpServer';
import { SesEmailProcessor } from './impl/SesEmailProcessor';
import { DiscordBot } from './impl/DiscordBot';
import { buildConfig } from './config';
import { SesEmailSender } from './impl/SesEmailSender';

const logger = pino({
  prettyPrint: process.env.NODE_ENV === 'development'
});

const config = buildConfig();

const app = new App(
  logger,
  config,
  new KoaHttpServer(logger),
  new DiscordBot(logger, config.discord),
  new SesEmailProcessor(),
  new SesEmailSender(config.email.ses)
);

app.start().catch(error => {
  console.error('Failed to start', error);
  process.exit(-1);
});
