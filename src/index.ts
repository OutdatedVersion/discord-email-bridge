import App from './impl/App';
import pino from 'pino';
import { KoaHttpServer } from './impl/KoaHttpServer';
import { SesEmailProcessor } from './impl/SesEmailProcessor';
import { DiscordBot } from './impl/DiscordBot';

const logger = pino({
  prettyPrint: process.env.NODE_ENV === 'development'
});

const app = new App(
  logger,
  new KoaHttpServer(logger),
  new DiscordBot(logger),
  new SesEmailProcessor()
);

app.start().catch(error => {
  console.error('Failed to start', error);
  process.exit(-1);
});
