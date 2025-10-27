# octavian
Learning App for Roland V-Accordions, Digital Piano

# PostgreSQL

You can start a PostgreSQL container locally using Docker:

`docker rm -f octavian-postgres`

`docker run --name octavian-postgres -e POSTGRES_USER=octavian -e POSTGRES_PASSWORD=octavian -e POSTGRES_DB=octavian -p 8877:5432 -d postgres`

`docker rm -f octavian-test-postgres`

`docker run --name octavian-test-postgres -e POSTGRES_USER=octavian_test -e POSTGRES_PASSWORD=octavian_test -e POSTGRES_DB=octavian_test -p 9876:5432 -d postgres`

Octavian will initialize the database on the first run using [Golang-migrate](https://github.com/golang-migrate/migrate).