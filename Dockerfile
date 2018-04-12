# FROM node as node

# RUN mkdir /app

# WORKDIR /app

# COPY ./www /app/www

# RUN npm install

# COPY ./ /app/

# ARG env=prod

# RUN npm run build -- --prod --environment $env

FROM nginx

COPY ./www/ /var/www/ui

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf