#экономим 200 мб на кеше + npm prune удаляет целых лишних 11 пакетов суммарно 220 кб итого треш из node_modules весит меньше
FROM node:17-alpine as module-stage
WORKDIR /app
COPY package.json ./
RUN npm install && npm prune
FROM node:17-alpine
WORKDIR /app
COPY --from=module-stage . .
EXPOSE 3000
CMD ["npm", "start"]