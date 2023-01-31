FROM golang:alpine AS builder

WORKDIR /usr/src/app

COPY hello.go ./
RUN CGO_ENABLED=0 go build -a -ldflags '-extldflags "-static" -s -w' hello.go

FROM scratch

WORKDIR /

COPY --from=builder /usr/src/app/ /

CMD ["./hello"]