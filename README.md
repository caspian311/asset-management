# Asset Management

This is my attempt at microservices. 
The hopeful end result is to have an application that will allow administrators 
users to login and manage users and their allocated resources (laptops, phones, 
other company owned devices).

## Goal

The goal is to learn: microservice architecture, multi-service deployments using
 Docker, box provisioning using Ansible.

### Outside readings:

[http://www.infoq.com/articles/microservices-intro](http://www.infoq.com/articles/microservices-intro)

[http://martinfowler.com/articles/microservices.html](http://martinfowler.com/articles/microservices.html)


## Setup

### Prerequisites

Pre-installed components:

* node-js
* ruby
* rails 

The only thing for tests that I require to be installed globally is karma.

    npm install -g karma-cli


### Tests

Even though all services and components should be separate, I wanted a single place to run all tests.

    ./run_tests

### Running

This will create all docker containers and start them all up linked together.

    ./build.sh

