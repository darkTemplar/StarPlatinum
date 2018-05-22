#!/bin/bash
echo "********************************************************"
echo "Build and push docker images to Amazon Container Registry"
echo "********************************************************"
echo "Build images"
docker-compose build
echo "********************************************************"
echo "login to registry"
`aws ecr get-login --no-include-email`
echo "********************************************************"
echo "tag images"
docker tag phoenix:latest 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:phoenix-latest
docker tag web-client:latest 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:web-latest
echo "********************************************************"
echo "push images"
docker push 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:phoenix-latest
docker push 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:web-latest
echo "********************************************************"
echo "Done"
echo "********************************************************"
