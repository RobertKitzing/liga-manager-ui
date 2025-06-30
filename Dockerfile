####################
## PRODUCTION
####################

FROM nginx:stable-alpine-slim As production
RUN apk add certbot certbot-nginx --no-cache

COPY ./dist/apps/liga-manager-ui-web/browser /ui
COPY ./nginx.ui.conf /nginx-ui/nginx.ui.conf