FROM node AS b

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./ /app/

ARG env=prod

RUN npm run build -- --prod --environment $env

FROM nginx

COPY --from=node /app/www/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf