FROM node:slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Install playwright dependencies
RUN pnpm exec playwright install --with-deps

COPY . .

EXPOSE 3101