from node:latest

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json .
RUN npm install

COPY app.js .

ENV STATSD_HOST=graphite
ENV TIME_ZONE=America/New_York


CMD npm start