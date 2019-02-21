FROM node

RUN mkdir /Playground
WORKDIR /Playground

COPY . /Playground

CMD ["node", "index.js"]