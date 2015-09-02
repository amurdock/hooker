FROM node:0.12.7-wheezy

# Staging
RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app

# Bundle app source
COPY package.json ./
RUN npm install
COPY hooks/ *.js ./

EXPOSE 8080
CMD ["node", "index.js"]
