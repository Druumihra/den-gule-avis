FROM node:16.18.1-alpine AS builder

COPY public /src/
COPY src /src/
COPY package.json /src/
COPY yarn.lock /src/
COPY vite.config.ts /src/
COPY index.html /src/
COPY tsconfig.json /src/
COPY tsconfig.node.json /src/
WORKDIR /src/

RUN ["yarn", "install", "--frozen-lockfile"]
RUN ["yarn", "build"]

FROM busybox:1.34.1-musl AS runner

RUN adduser -D runner
USER runner
RUN mkdir -p /home/runner/static
COPY --chown=runner --from=builder /src/dist/ /home/runner/static
CMD ["busybox", "httpd", "-f", "-p", "8080", "-h", "/home/runner/static"]
