# Currency Dockerfile
FROM node:18-alpine

WORKDIR /workspace

# Copy root package.json and lock file for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace into the container
COPY . .

# Build the currency app using Nx
RUN npm run build:currency

# Expose the port for the currency app
EXPOSE 3001

# Start the currency app
CMD ["node", "dist/apps/currency/main.js"]
