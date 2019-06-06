import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const PORT = process.env.PORT || 2000;

export function startHttpServer() {
  const app = new Koa();

  app.use(bodyParser());

  app.use(context => {
    context.body = {};
  });

  app.listen(PORT);
}
