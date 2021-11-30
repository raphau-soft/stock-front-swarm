FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/stock /usr/share/nginx/html

# FROM node:15-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build --prod

# FROM nginx:1.19.4-alpine
# COPY --from=build-step /dist/stock /usr/share/nginx/html