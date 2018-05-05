#!/bin/bash

docker build -t abhas23/starplatinum:latest .
docker push abhas23/starplatinum:latest

deploy/deploy_aws.sh