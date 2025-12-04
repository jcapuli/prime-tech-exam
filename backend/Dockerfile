# Backend Dockerfile - NestJS with PostgreSQL
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

# Install PostgreSQL client for health checks (optional)
RUN apk add --no-cache postgresql-client

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if(r.statusCode !== 200) throw new Error()})" || exit 1

CMD ["node", "dist/main"]
