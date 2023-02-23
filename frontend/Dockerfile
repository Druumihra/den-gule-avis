FROM node:16.18.1-alpine AS frontend-builder

COPY . /src
WORKDIR /src

RUN ["yarn", "install", "--frozen-lockfile"]
RUN ["yarn", "build"]

FROM golang:1.19.2-alpine AS server-builder

COPY server /src
WORKDIR /src
ENV CGO_ENABLED=0
RUN ["go", "build", "."]

FROM scratch AS runner
COPY --from=frontend-builder /src/dist/ /files
COPY --from=server-builder /src/server /

CMD ["/server"]
