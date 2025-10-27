# =========================================
# Stage 1: Build the Angular Application
# =========================================
FROM node:24.7.0-alpine AS frontend
WORKDIR /frontend
COPY client/package.json client/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY client .
RUN npm run build -- --base-href / --output-path="dist" --configuration="production"

# =========================================
# Stage 2: Build the Go Application
# =========================================
FROM golang:latest AS backend
WORKDIR /backend
COPY server/go.mod .
COPY server/go.sum .
RUN go mod download
COPY server .
# Embed the static files generated above
COPY --from=frontend /frontend/dist ./src/ui
# Build the Go application
RUN go build -o /octavian github.com/geniot/octavian/src
# =========================================
# Stage 3: Prepare executable
# =========================================
FROM golang:latest as run
WORKDIR /app
COPY --from=backend /octavian ./octavian
EXPOSE 8222
CMD ["/app/octavian"]