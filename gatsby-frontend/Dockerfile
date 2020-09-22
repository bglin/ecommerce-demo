FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install -g gatsby-cli

RUN npm install

EXPOSE 8000

CMD ["gatsby", "develop", "-H", "0.0.0.0"]
