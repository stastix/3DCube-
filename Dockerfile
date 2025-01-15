# Stage 1: Build stage
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the app's code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Runtime stage (final image)
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the production dependencies and the built app from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next

# Install only production dependencies
RUN npm install --production

# Expose the app on port 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
