FROM golang:1.20-alpine

COPY . /app
WORKDIR /app

RUN CGO_ENABLED=0 go build

CMD [ "/app/dashboard" ]
