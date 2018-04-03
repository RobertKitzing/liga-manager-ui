FROM node

RUN mkdir app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./ /app/

ARG env=prod

RUN npm run build -- --prod --environment $env

COPY --from=node /app/www/ /var/www/ui

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf