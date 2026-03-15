FROM node:22-slim AS base

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/ 

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=base /app ./

CMD ["npm", "start"]