FROM node:20

WORKDIR /app/frontend

COPY package*.json ./

RUN apt-get update && apt-get install -y netcat-openbsd

RUN npm install

COPY . .


COPY ./build.sh ./build.sh

RUN chmod +x ./build.sh

EXPOSE 5173

CMD [ "sh", "./build.sh" ]