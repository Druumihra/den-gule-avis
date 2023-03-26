FROM docker.io/rust:1.68.1-bullseye AS builder
WORKDIR /src
COPY . /src
ENV CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse
RUN cargo build --release

FROM docker.io/debian:bullseye AS runner
RUN apt-get -y update
RUN apt-get -y install mariadb-server
RUN adduser runner
USER runner
RUN mkdir -p /home/runner/srv
COPY --chown=runner --from=builder /src/target/release/backend /home/runner/srv
EXPOSE 8081
ENV DATABASE_URL=mysql://root:example@db:3306/backend
ENV AUTH_SERVER=http://auth:8080
CMD ["/home/runner/srv/backend"]
