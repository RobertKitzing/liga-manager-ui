####################
## PRODUCTION
####################

FROM nginx:stable-alpine-slim
RUN apk add certbot certbot-nginx --no-cache

COPY ./dist/apps/liga-manager-ui-web /ui
COPY ./nginx.ui.conf /nginx-ui/nginx.ui.conf
COPY ./nginx.template-variables /etc/nginx/templates/10-variables.conf.template

ENV GOOGLE_MAPS_API_KEY=""