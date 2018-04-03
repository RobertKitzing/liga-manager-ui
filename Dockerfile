FROM node as node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./ /app/

ARG env=prod

RUN npm run build -- --prod --environment $env