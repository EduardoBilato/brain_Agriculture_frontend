FROM node:18-alpine as base

ARG PUBLIC_BACK_URL

WORKDIR /opt/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

FROM base as app

ENV PUBLIC_BACK_URL=$PUBLIC_BACK_URL

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
