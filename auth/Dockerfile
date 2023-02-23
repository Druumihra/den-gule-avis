FROM node:16.18.1-alpine AS builder

COPY src /src/
COPY package.json /src/
COPY yarn.lock /src/
COPY tsconfig.json /src/
WORKDIR /src/

RUN ["yarn", "install", "--frozen-lockfile"]
RUN ["yarn", "build"]

FROM node:16.18.1-alpine AS builder
RUN adduser -D runner
USER runner
RUN mkdir -p /home/runner/server
COPY --chown=runner /dist/* /home/runner/server/
CMD [ "yarn", "start" ]
