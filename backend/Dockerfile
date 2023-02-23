FROM docker.io/rust:bullseye AS builder

COPY . /src
WORKDIR /src
RUN cargo build --release

FROM debian:bullseye AS runner
RUN adduser runner
USER runner
RUN mkdir -p /home/runner/srv
COPY --from=builder --chown=runner /src/target/release/backend /home/runner/srv
CMD ["/home/runner/srv/backend"]
