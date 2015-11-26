#!/bin/bash -e

echo "Running web tests..."

pushd web &> /dev/null
  npm install &> /dev/null
  bower install &> /dev/null
  karma start karma.conf-ci.js
popd &> /dev/null

echo "Running auth_service tests..."

pushd auth_service &> /dev/null
  bundle &> /dev/null
  bundle exec rake db:migrate &> /dev/null
  bundle exec rspec
popd &> /dev/null

echo "Running user_service tests..."

pushd user_service &> /dev/null
  bundle &> /dev/null
  bundle exec rake db:migrate &> /dev/null
  bundle exec rspec
popd &> /dev/null
