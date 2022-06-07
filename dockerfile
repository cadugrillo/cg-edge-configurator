# syntax=docker/dockerfile:1

FROM golang:1.16-alpine AS builder

WORKDIR /usr/local/go/src/cg-edge-configurator

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY main.go ./
COPY ./handlers/ /usr/local/go/src/cg-edge-configurator/handlers
COPY ./configurator/ /usr/local/go/src/cg-edge-configurator/configurator
COPY ./apps/ /usr/local/go/src/cg-edge-configurator/apps
RUN mkdir -p /apps

RUN ls -laR ./

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GOFLAGS=-mod=mod go build -ldflags="-w -s" -o /cgEdgeConfApi

RUN ls /
#RUN go build -gcflags "all=-N -l" -o /cgEdgeConfApi

#Step 2 - Build a small image

FROM scratch


COPY --from=builder /cgEdgeConfApi /cgEdgeConfApi
COPY --from=builder /apps /apps

EXPOSE 4300

CMD [ "/cgEdgeConfApi" ]

