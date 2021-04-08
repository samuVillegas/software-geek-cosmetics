FROM node:12-alpine as node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8085

CMD ["npm", "start"]