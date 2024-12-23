FROM node:20

WORKDIR /app/frontend

COPY package*.json ./

RUN apt-get update && apt-get install -y netcat-openbsd

RUN npm install

COPY . .

EXPOSE 5173
#sleep infinity
# CMD [ "sleep", "infinity" ]
CMD ["npm", "run", "dev"]