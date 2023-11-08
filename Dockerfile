################# installing 'frontend' dependencies
FROM node:18-alpine3.15 as frontend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY /frontend/package*.json ./
RUN yarn install --frozen-lockfile

################# preparing 'frontend' build
FROM node:18-alpine3.15 as frontend-builder
WORKDIR /app
COPY --from=frontend-deps /app/node_modules ./node_modules
COPY /frontend .
RUN yarn build

###################################################################

################# installing 'backend' dependencies
FROM node:18-alpine3.15 as backend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY /backend/package*.json ./
RUN yarn install --frozen-lockfile

################# preparing 'backend' build
FROM node:18-alpine3.15 as backend-builder
WORKDIR /app
COPY --from=backend-deps /app/node_modules ./node_modules
COPY /backend .
RUN yarn build

###################################################################

################ preparing production image
FROM node:18-alpine3.15 as runner
WORKDIR /usr/src/app
COPY /backend/package*.json ./
RUN yarn install --prod
### copy json file (database) into workdir
COPY ./backend/src/db ./db
### copy backend build into workdir
COPY --from=backend-builder /app/dist ./dist
### copy frontend build into 'public' folder inside 'dist' on workdir
COPY --from=frontend-builder /app/dist ./dist/public

CMD ["npm", "run", "start:prod"]