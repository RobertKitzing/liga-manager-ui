FROM node:8-alpine
# Create app directory
WORKDIR /usr/src/app

COPY ./dist ./

RUN npm install --only=production

EXPOSE 3098
EXPOSE 4000

CMD [ "npm", "start" ]