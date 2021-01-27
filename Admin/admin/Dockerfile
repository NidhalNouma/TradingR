FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
ENV PORT=3909

EXPOSE 3909
CMD [ "npm", "start" ]
