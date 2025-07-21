####################
## PRODUCTION
####################

FROM nginx:stable-alpine-slim
RUN apk add certbot certbot-nginx --no-cache

COPY ./dist/apps/liga-manager-ui-web /ui
COPY ./nginx.ui.conf.template /etc/nginx/templates/nginx.ui.conf.template
RUN mkdir -p /nginx-ui-conf
ENV NGINX_ENVSUBST_OUTPUT_DIR=/nginx-ui-conf/

VOLUME [ "/ui/browser/assets" ]

ENV GOOGLE_MAPS_API_KEY=""
ENV IMG_PROXY_HOST="imgproxy"