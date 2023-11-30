###################
# UI
###################

FROM node:lts-alpine as ui-builder

WORKDIR /ui

COPY frontend .

RUN npm ci
RUN npm run build:web

###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine As build

WORKDIR /nest

COPY --chown=node:node web-server/package*.json ./
COPY --chown=node:node web-server .

RUN npm ci
RUN npm run build

###################
# PRODUCTION DEPENDECIES
###################

FROM node:lts-alpine As prod-dependencies

RUN apk add curl bash --no-cache && \
	curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /nest

COPY --chown=node:node web-server/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
RUN /usr/local/bin/node-prune

####################
## PRODUCTION
####################

FROM node:lts-alpine As production

WORKDIR /liga-manager

COPY --chown=node:node --from=prod-dependencies /nest/node_modules ./node_modules
COPY --chown=node:node --from=build /nest/assets ./assets
COPY --chown=node:node --from=build /nest/dist ./dist
COPY --chown=node:node --from=ui-builder /ui/dist/liga-manager-ui ./client

ENV NODE_ENV production
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
