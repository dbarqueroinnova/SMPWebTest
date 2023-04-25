FROM node:18-alpine
WORKDIR /app
RUN npm install
RUN npm build
COPY .next ./next


