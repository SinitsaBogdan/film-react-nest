FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build