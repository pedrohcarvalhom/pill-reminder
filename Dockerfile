FROM node:21.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN apt-get update -y && apt-get install -y openssl

CMD ["npm", "run", "dev"]