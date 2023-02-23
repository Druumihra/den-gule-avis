FROM node:16.18.1-alpine AS builder
RUN adduser -D runner
USER runner
RUN mkdir -p /home/runner/src
COPY --chown=runner . /home/runner/src
WORKDIR /home/runner/src
RUN ["yarn", "install", "--frozen-lockfile"]
RUN ["yarn", "build"]
CMD ["yarn", "start"]
