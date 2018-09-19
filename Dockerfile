FROM keymetrics/pm2:latest-alpine

RUN npm install -g pm2

COPY . /var/www/
WORKDIR /var/www/

EXPOSE 80 3000 9200

CMD ["pm2-runtime", "pm2.json"]

