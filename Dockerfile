###################
# UI
###################

FROM node:lts-alpine as ui-builder

WORKDIR /ui

COPY frontend .

RUN npm ci
RUN npm run build:web

####################
## PRODUCTION
####################

FROM nginx:stable-alpine-slim As production
RUN apk add certbot certbot-nginx --no-cache

COPY --chown=node:node --from=ui-builder /ui/dist/liga-manager-ui /ui
COPY ./nginx.ui.conf /nginx-ui/nginx.ui.conf
COPY ./team-logos /team-logos