FROM docker.io/rust:bullseye AS builder

COPY . /src
WORKDIR /src
RUN cargo build --release

FROM scratch AS runner
COPY --from=builder /src/target/release/backend /
CMD ["/backend"]
