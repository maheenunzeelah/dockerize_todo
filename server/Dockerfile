FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN yarn install

COPY . .
EXPOSE 5000
CMD ["npm","run","start"]