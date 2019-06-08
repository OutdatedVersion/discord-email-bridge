import App from './impl/App';
import pino from 'pino';
import { KoaHttpServer } from './impl/KoaHttpServer';

const logger = pino({
  prettyPrint: process.env.NODE_ENV === 'development'
});

const app = new App(logger, new KoaHttpServer(logger));

app.start().catch(error => {
  console.error('Failed to start', error);
  process.exit(-1);
});
