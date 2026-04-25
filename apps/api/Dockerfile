# ===========================================
# BASE: Shared image with pnpm enabled
# ===========================================
FROM node:22.12.0-alpine3.21 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable

# ===========================================
# BUILD: install dependencies and build the application
# ===========================================
FROM base AS build
WORKDIR /usr/src/app

COPY package.json ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install 

COPY . .

# Genera el cliente de Prisma
# RUN npx prisma generate

# ===========================================
# RUNTIME: imagen final liviana
# ===========================================
FROM base AS api
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app .

EXPOSE 3000

# CMD ["sh", "-c", "npx prisma generate && pnpm run start:dev"]