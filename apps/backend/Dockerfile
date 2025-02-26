# Backend Dockerfile
FROM node:18-alpine

WORKDIR /workspace

# Copy root package.json and lock file for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace into the container
COPY . .

# Build the backend app using Nx
RUN npm run build:backend
# Expose the port for the backend app
EXPOSE 3000



# Start the backend app
# CMD ["node", "dist/apps/backend/main.js"]
