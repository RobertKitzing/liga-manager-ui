FROM node:8
# Create app directory
WORKDIR /usr/src/app

COPY ./server/package.json ./
COPY ./dist ./

RUN npm install --only=production

CMD [ "npm", "start" ]