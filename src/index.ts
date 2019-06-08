import App from './impl/App';
import { KoaHttpServer } from './impl/KoaHttpServer';

const app = new App(new KoaHttpServer());

app.start().catch(error => {
  console.error('Failed to start', error);
  process.exit(-1);
});
