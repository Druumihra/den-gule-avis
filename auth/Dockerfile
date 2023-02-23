FROM node:16.18.1-alpine AS builder

COPY . /src/
WORKDIR /src/
RUN ["yarn", "install", "--frozen-lockfile"]
RUN ["yarn", "build"]

FROM node:16.18.1-alpine AS builder
RUN adduser -D runner
USER runner
RUN mkdir -p /home/runner/server
WORKDIR /home/runner/server
COPY --chown=runner /dist/* /home/runner/server/
COPY --chown=runner package.json /home/runner/server
COPY --chown=runner yarn.lock /home/runner/server

RUN ["yarn", "install", "--frozen-lockfile"]
CMD [ "yarn", "start" ]
