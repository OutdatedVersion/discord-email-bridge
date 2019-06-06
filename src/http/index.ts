import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { processWebhook } from './processor';

const PORT = process.env.PORT || 2000;

export function startHttpServer() {
  const app = new Koa();

  app.use(bodyParser());

  app.use(async context => {
    if (context.path !== '/') {
      context.throw(404, 'page not found');
      return;
    }

    await processWebhook(context.request.body);

    context.status = 204;
  });

  app.listen(PORT);
}
