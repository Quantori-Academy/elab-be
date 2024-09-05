# Stage Development
FROM node:20 AS development

# Set working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port
EXPOSE 3000

# Development environment command
CMD ["npm", "run", "start:docker:dev"]

##################################

# Stage Production
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --production

# Copy the application code
COPY . .

# Build the application
RUN npm run build

##################################

# Stage Final Production Image
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

COPY package*.json ./

# Expose the port
EXPOSE 3000

# Production environment command
CMD ["node", "dist/main"]
