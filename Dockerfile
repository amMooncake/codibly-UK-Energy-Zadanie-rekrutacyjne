# Stage 1: Build the client
FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=server-builder /app/server/package.json /app/server/package-lock.json ./server/
RUN cd server && npm install --omit=dev
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=client-builder /app/client/dist ./server/dist/public

EXPOSE 8080

CMD ["node", "server/dist/index.js"]
