FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install -g sequelize-cli

EXPOSE 3000

CMD ["node", "server.js"]