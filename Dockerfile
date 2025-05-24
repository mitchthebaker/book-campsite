FROM node:slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY . .

RUN pnpm run build

EXPOSE 3000

# Use a non-root user for security
RUN addgroup app && adduser -S -G app app
USER app

CMD ["node", "dist/index.js"]