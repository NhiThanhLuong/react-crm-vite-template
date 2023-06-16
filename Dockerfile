FROM node:16.15-alpine3.16 AS nodemodules
WORKDIR /app
RUN apk update
RUN apk add bash
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile


FROM node:16.15-alpine3.16 AS builder
WORKDIR /app
RUN apk update
RUN apk add bash
COPY . .
COPY --from=nodemodules /app/node_modules ./node_modules
RUN yarn build


FROM node:16.15-alpine3.16 AS runner
WORKDIR /app
RUN apk update
RUN apk add bash
RUN yarn global add serve
COPY --from=builder /app/dist ./

EXPOSE 3000
CMD ["serve", "-s", "/app"]
