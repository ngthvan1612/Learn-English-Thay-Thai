FROM node:18 AS build-env

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.18.0-alpine AS deploy-env

WORKDIR /deploy

COPY --from=build-env /app/build/ .

COPY ./nginx.conf /etc/nginx/nginx.conf
