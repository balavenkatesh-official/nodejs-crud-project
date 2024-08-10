# Use the official Node.js image as the base image
FROM public.ecr.aws/docker/library/node:14.15.4

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install cors
RUN npm install dotenv
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Copy index.html from the parent directory to the app directory
#COPY public/index.html /usr/src/app/
#COPY public/style.css /usr/src/app
#COPY public/crud.js /usr/src/app
#COPY public/.env /usr/src/app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pm2-runtime", "app.js"]

