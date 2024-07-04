FROM  node:lts-alpine 

WORKDIR /app

COPY . .

RUN npm install 

EXPOSE 9192

CMD npm run start