###################
# UI
###################

FROM node:lts-alpine as ui-builder

WORKDIR /ui

COPY frontend/package*.json ./
COPY frontend .

RUN npm ci
RUN npm run build

###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine As build

WORKDIR /usr/src/app

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

WORKDIR /usr/src/app

COPY --chown=node:node web-server/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
RUN /usr/local/bin/node-prune

####################
## PRODUCTION
####################

FROM node:lts-alpine As production

WORKDIR /liga-manager

COPY --chown=node:node --from=prod-dependencies /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=ui-builder /ui/dist/liga-manager-ui ./client

ENV NODE_ENV production
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
