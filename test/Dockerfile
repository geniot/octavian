FROM golang:latest AS test

ARG RESET_TOKEN="sometoken"
ARG RESET_URL="https://reset.vitas.dev/reset"

ENV RESET_TOKEN=${RESET_TOKEN}
ENV RESET_URL=${RESET_URL}

WORKDIR /test
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN BASE_API_URL=https://test.octavian.app/api \
    BASE_UI_URL=https://test.octavian.app \
    DATABASE_URL=postgres://octavian_test:octavian_test@octavian-test-pg:5432/octavian_test \
    RESET_URL=${RESET_URL} \
    RESET_TOKEN=${RESET_TOKEN} \
    go test github.com/geniot/octavian-test/src -json
