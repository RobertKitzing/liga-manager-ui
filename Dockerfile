FROM nginx:1.28.0-alpine3.21-slim
RUN apk add certbot certbot-nginx --no-cache

COPY ./dist/apps/liga-manager-ui-web /ui
COPY ./nginx.ui.conf /nginx-ui-conf/nginx.ui.conf
COPY ./appsettings/appsettings.web.json /nginx-ui-conf/appsettings.web.json.template
COPY entrypoint.sh /entrypoint.sh

VOLUME [ "/ui/browser/assets" ]

ENV GOOGLE_MAPS_API_KEY=""
ENV IMG_PROXY_HOST="imgproxy"
ENV USE_IMGPROXY=false
ENV USE_LOCAL_ASSETS=false
ENV TZ="Europe/Berlin"

ENTRYPOINT [ "sh", "/entrypoint.sh" ]