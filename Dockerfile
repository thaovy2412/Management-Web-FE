FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install -g npm@7.12.0

RUN npm install

RUN npm install -g @angular/cli

COPY . /app

CMD ng serve --host 0.0.0.0
