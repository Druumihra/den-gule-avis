FROM docker.io/rust:bullseye AS builder
WORKDIR /src
COPY . /src
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
CMD ["/home/runner/srv/backend"]
