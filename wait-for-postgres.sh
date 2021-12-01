#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD="geekbrains" psql -h "$host" -d "db_todo" -U "django" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
