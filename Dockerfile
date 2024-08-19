FROM node:20-alpine as base

ARG PUBLIC_BACK_URL

WORKDIR /opt/app/

COPY package*.json ./

RUN npm update \
    && npm install --legacy-peer-deps

FROM base as app

ENV PUBLIC_BACK_URL=$PUBLIC_BACK_URL

WORKDIR /opt/app/

COPY . .

EXPOSE 3000

CMD ["npm", "run","start:dev"]
