FROM node:12.4.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json .

COPY src .

RUN npm run build

RUN npm prune --production

EXPOSE 2000

ENTRYPOINT [ "node", "build/index.js" ]