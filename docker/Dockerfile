FROM node:16 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g @vue/cli@5.0.5
RUN npm run build

FROM nginx:1.23

COPY nginx/apps.conf /etc/nginx/conf.d/apps.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/html/dist

CMD ["nginx", "-g", "daemon off;"]
