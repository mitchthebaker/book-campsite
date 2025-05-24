FROM node:slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]