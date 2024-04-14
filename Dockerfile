FROM node:current
ENV PORT=7070
WORKDIR /avito_close-master/
COPY package*.json ./
RUN npm install
COPY . /avito_close-master
CMD ["npm", "run", "start"]
