# Use official Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the app's port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]