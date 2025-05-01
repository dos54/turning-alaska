# Use official Node LTS base image
FROM node:23-slim

# Set working directory inside container
WORKDIR /usr/src/app

# Copy only package.json/package-lock.json first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all remaining source files
COPY . .

# Expose port CapRover will connect to
EXPOSE 3000

# Start your app (adjust if you're not using "start" in package.json)
CMD ["node", "server.js"]
