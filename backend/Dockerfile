# Use Node.js v14
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install sequelize sequelize-cli mysql2 --save --legacy-peer-deps && npm install mysql2 pino-pretty url socket.io sequelize qrcode-terminal qrcode @whiskeysockets/baileys @hapi/boom bcrypt body-parser cookie-parser cors cron dotenv express fs jsonwebtoken moment multer node-cache node-cron path pino jimp --legacy-peer-deps

# Bundle app source
COPY . .

# Expose the port
EXPOSE 5000

CMD [ "node", "index.js" ]
