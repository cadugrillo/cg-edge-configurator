# syntax=docker/dockerfile:1

FROM golang:1.16-alpine AS builder

RUN apk --no-cache add ca-certificates
WORKDIR /usr/local/go/src/cg-edge-configurator

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY main.go ./
COPY ./handlers/ /usr/local/go/src/cg-edge-configurator/handlers
COPY ./system/ /usr/local/go/src/cg-edge-configurator/system
COPY ./users/ /usr/local/go/src/cg-edge-configurator/users
COPY ./images/ /usr/local/go/src/cg-edge-configurator/images
COPY ./networks/ /usr/local/go/src/cg-edge-configurator/networks
COPY ./volumes/ /usr/local/go/src/cg-edge-configurator/volumes
COPY ./containers/ /usr/local/go/src/cg-edge-configurator/containers
COPY ./apps-repository/ /usr/local/go/src/cg-edge-configurator/apps-repository
COPY ./configurator/ /usr/local/go/src/cg-edge-configurator/configurator
COPY ./apps/ /usr/local/go/src/cg-edge-configurator/apps
RUN mkdir -p /apps
#RUN mkdir -p /users
#COPY ./users/users.json /users

RUN ls -laR ./

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GOFLAGS=-mod=mod go build -ldflags="-w -s" -o /cgEdgeConfApi

RUN ls /
#RUN go build -gcflags "all=-N -l" -o /cgEdgeConfApi

#Step 2 - Build a small image

FROM scratch

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /cgEdgeConfApi /cgEdgeConfApi
COPY --from=builder /apps /apps
#COPY --from=builder /users /users

EXPOSE 4343
EXPOSE 4383

CMD [ "/cgEdgeConfApi" ]

