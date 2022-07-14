FROM node:alpine as build-step
RUN mkdir /
WORKDIR /
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
CMD ["npm","start"]