FROM node:18-alpine

# Set memory limits for Node.js to prevent crashing on Eco tier
ENV NODE_OPTIONS="--max-old-space-size=300"
ENV NODE_ENV=production

WORKDIR /app

# Copy dependency files and install ONLY what is needed
COPY package*.json ./
RUN npm install --omit=dev --no-audit

# Copy the rest of the files
COPY . .

# Koyeb uses port 8080 by default
ENV PORT=8080
EXPOSE 8080

CMD ["node", "index.mjs"]
