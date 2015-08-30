FROM debian:wheezy

# Installation dependencies
RUN apt-get update && apt-get install -y curl

# Runtime dependencies
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs

# Bundle app source
ADD package.json index.js /

# We should minimize the image size by uninstalling stuff here?

# App dependencies
RUN npm install

EXPOSE  8080
CMD ["node", "./index.js"]
