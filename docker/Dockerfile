FROM node:16 AS builder

WORKDIR /app
COPY . .

RUN cat .env && \
    npm cache clean --force && \
    npm install --force && \
    npm i @vue/cli@5.0.5 --force && \
    npm run build && \
    rm -rf node_modules && \
    npm prune --production && \
    npm cache clean --force

FROM nginx:1.23

COPY nginx/apps.conf /etc/nginx/conf.d/apps.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/html/dist

CMD ["nginx", "-g", "daemon off;"]
