FROM node

RUN mkdir /Playground
WORKDIR /Playground

RUN npm install

COPY . /Playground

CMD ["node", "index.js"]