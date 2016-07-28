#!/bin/sh -e

echo 'stopping all docker containers'
set +e
docker rm -f $(docker ps -a | grep -v CONTAINER | awk '{print $1}')
set -e

echo 'build-images'
docker build -t caspian311/asset-management-db:1.0 db
docker build -t caspian311/asset-management-auth:1.0 auth_service
docker build -t caspian311/asset-management-user:1.0 user_service
docker build -t caspian311/asset-management-web:1.0 web

echo 'create loggin directories'

web_log_dir=$(mkdir -p logging/web ; cd logging/web &> /dev/null; pwd; cd - &> /dev/null)
db_log_dir=$(mkdir -p logging/db ; cd logging/db &> /dev/null; pwd; cd - &> /dev/null)
data_dir=$(mkdir -p data ; cd data &> /dev/null; pwd; cd - &> /dev/null)
auth_log_dir=$(mkdir -p logging/app/auth ; cd logging/app/auth &> /dev/null; pwd; cd - &> /dev/null)
user_log_dir=$(mkdir -p logging/app/user ; cd logging/app/user &> /dev/null; pwd; cd - &> /dev/null)

echo 'run-images'
docker run -d \
  --name asset-management-db \
  -v $data_dir:/var/lib/mysql -v $db_log_dir:/var/log/mysql \
  caspian311/asset-management-db:1.0

docker run -d \
  --name asset-management-user \
  --link asset-management-db \
  -v $user_log_dir:/usr/src/app/log \
  caspian311/asset-management-user:1.0 

docker run -d \
  --name asset-management-auth \
  --link asset-management-user \
  -v $auth_log_dir:/usr/src/app/log \
  caspian311/asset-management-auth:1.0 

docker run -d \
  --name asset-management-web \
  --link asset-management-auth \
  --link asset-management-user \
  -v $web_log_dir:/var/log/nginx \
  -p 80:80 \
  caspian311/asset-management-web:1.0 

sleep 1

docker ps

echo 'done'

