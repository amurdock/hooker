FROM node:0.12.7-wheezy

# Staging
RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app

# Bundle app source
RUN COPY package.json ./
RUN npm install
RUN COPY hooks/ *.js ./

EXPOSE 8080
CMD ["node", "index.js"]
