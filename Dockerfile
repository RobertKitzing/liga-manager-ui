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

FROM nginx:stable-alpine As production

COPY --chown=node:node --from=ui-builder /ui/dist/liga-manager-ui /ui
COPY ./frontend/nginx.ui.conf /nginx-ui/nginx.ui.conf