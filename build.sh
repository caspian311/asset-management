#!/bin/sh -e

echo 'stopping all docker containers'
set +e
docker rm -f $(docker ps -a | grep -v CONTAINER | awk '{print $1}')
set -e

echo 'build-images'
docker build -t caspian311/asset-management-web:1.0 web

echo 'create loggin directories'

web_log_dir=$(mkdir -p logging/web ; cd logging/web &> /dev/null; pwd; cd - &> /dev/null)

echo 'run-images'
docker run -d --name asset-management-web -v $web_log_dir:/var/log/nginx -p 80:80 caspian311/asset-management-web:1.0

docker ps

echo 'done'

