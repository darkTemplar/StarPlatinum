#!/bin/bash
echo "********************************************************"
echo "Build and push docker images to Amazon Container Registry"
echo "********************************************************"
echo "Build images"
docker-compose -f prod.yml build
echo "********************************************************"
echo "login to registry"
`aws ecr get-login --no-include-email`
echo "********************************************************"
echo "tag images"
docker tag phoenix:latest 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:phoenix-latest
docker tag web-client:latest 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:web-latest
docker tag loadbalancer:latest 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:loadbalancer-latest
echo "********************************************************"
echo "push images"
docker push 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:phoenix-latest
docker push 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:web-latest
docker push 103126352378.dkr.ecr.us-west-1.amazonaws.com/offerdate:loadbalancer-latest
echo "********************************************************"
echo "Done"
echo "********************************************************"
echo "Build and Upload static assets to s3"
echo "********************************************************"
source .env
cd app
rm -rf node_modules
npm install
npm run build
s3cmd --configure --access_key=$AWS_ACCESS_KEY --secret_key=$AWS_SECRET_KEY -s --no-encrypt --dump-config 2>&1 | tee .s3cfg
# temporary fix to copy over static folder under build to main static folder
mv build/static/ static
s3cmd sync build/* s3://offerdate-web-bundle
s3cmd sync static/* s3://offerdate-web-bundle
