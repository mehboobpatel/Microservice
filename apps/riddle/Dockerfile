# Riddle Dockerfile
FROM node:18-alpine

WORKDIR /workspace

# Copy root package.json and lock file for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace into the container
COPY . .

# Build the riddle app using Nx
RUN npm run build:riddle

# Expose the port for the riddle app
EXPOSE 3002

# Start the riddle app
CMD ["node", "dist/apps/riddle/main.js"]
