FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install --network-timeout 100000

COPY . .

RUN yarn build

EXPOSE 80

CMD [ "yarn", "start" ]
