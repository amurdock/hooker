FROM nodesource/wheezy:0.12.7

# Staging
RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app

# Bundle app source
COPY package.json ./
RUN npm install
COPY *.js ./
COPY hooks ./hooks

EXPOSE 8901
CMD ["npm", "start"]
