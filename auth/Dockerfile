FROM node:16.18.1-alpine AS builder
RUN adduser -D runner
USER runner
RUN mkdir -p /home/runner/src
COPY --chown=runner . /home/runner/src
WORKDIR /home/runner/src
ENV DB_USER=root
ENV DB_HOST=db
ENV DB_PASSWORD=example
ENV DB=auth
ENV DATABASE_URL=mysql://root:example@db:3306/auth
RUN ["yarn", "install", "--frozen-lockfile"]
RUN ["npx", "prisma", "generate"]
RUN ["yarn", "build"]
CMD ["yarn", "start"]
