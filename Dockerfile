FROM node:18-alpine3.16 as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN yarn
COPY . ./

ARG VITE_BACKEND_ENDPOINT

RUN VITE_BACKEND_ENDPOINT=${VITE_BACKEND_ENDPOINT} \
    yarn build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html