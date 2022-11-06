# Installs Node.js image
FROM node:14.21.0-alpine3.16

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

RUN npm install

COPY ./src ./src

CMD npm run dev