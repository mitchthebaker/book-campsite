FROM node:slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Install playwright dependencies
RUN pnpm exec playwright install --with-deps

COPY . .

RUN pnpm run build

EXPOSE 3000