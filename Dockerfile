FROM node:14 as base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Test the application through Docker
FROM base as test
RUN npm ci
COPY . .
RUN npm run test

# Deploy for production environment
FROM base as prod
RUN npm ci --production
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
