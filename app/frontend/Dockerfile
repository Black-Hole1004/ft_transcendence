FROM node:20

WORKDIR /app/frontend

COPY package*.json ./

RUN apt-get update && apt-get install -y netcat-openbsd

RUN npm install

COPY . .

EXPOSE 5173

# RUN npm run build

# CMD ["npm", "run", "preview", "--", "--port", "5173"]

CMD ["npm", "run", "dev"]
