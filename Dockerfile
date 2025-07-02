####################
## PRODUCTION
####################

FROM nginx:stable-alpine-slim
RUN apk add certbot certbot-nginx --no-cache

COPY ./dist/apps/liga-manager-ui-web /ui
COPY ./nginx.ui.conf /nginx-ui/nginx.ui.conf