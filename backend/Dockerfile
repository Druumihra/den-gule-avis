FROM docker.io/rust:bullseye AS builder

COPY . /src
WORKDIR /src
ENV DATABASE_URL=$DATABASE_URL
RUN cargo build --release

FROM debian:bullseye AS runner
RUN adduser runner
USER runner
RUN mkdir -p /home/runner/srv
COPY --from=builder --chown=runner /src/target/release/backend /home/runner/srv

ENV DATABASE_URL=$DATABASE_URL
EXPOSE 8081
CMD ["/home/runner/srv/backend"]
