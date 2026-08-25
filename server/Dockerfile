FROM golang:1.25-alpine AS build

WORKDIR /src
COPY go.mod ./
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/amsr-api .

FROM alpine:3.22

RUN addgroup -S amsr && adduser -S -G amsr amsr \
    && mkdir -p /data \
    && chown -R amsr:amsr /data
COPY --from=build /out/amsr-api /usr/local/bin/amsr-api

USER amsr
ENV PORT=8080
ENV AMSR_DATA_PATH=/data/applications.json
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/amsr-api"]
