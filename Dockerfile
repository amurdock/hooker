FROM node:0.12.7-wheezy

# Staging
RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app

# Bundle app source
ONBUILD COPY package.json /usr/node/app/
ONBUILD RUN npm install
ONBUILD COPY hooks/ *.js /usr/node/app

EXPOSE 8080
CMD ["node", "./index.js"]
