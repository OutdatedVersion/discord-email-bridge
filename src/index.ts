import { startHttpServer } from './http';

async function main() {
  startHttpServer();
}

main().catch(error => {
  console.error('Failed to start', error);
  process.exit(-1);
});
