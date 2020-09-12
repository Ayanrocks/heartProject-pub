FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn global add nodemon
CMD [ "nodemon", "app.js" ]
