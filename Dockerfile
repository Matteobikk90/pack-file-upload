FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "4173"]