FROM golang:1.20-alpine AS Build

COPY . /app
WORKDIR /app

RUN CGO_ENABLED=0 go build

FROM scratch

COPY --from=Build /app/app /app

CMD [ "/app" ]
