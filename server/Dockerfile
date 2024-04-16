
FROM node:19.6-bullseye-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

CMD ["npm", "run", "dev"]

FROM base as production

ENV NODE_ENV production

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production

USER node


COPY --chown=node:node ./src/ .

EXPOSE 8000

CMD [ "node", "index.js" ]
