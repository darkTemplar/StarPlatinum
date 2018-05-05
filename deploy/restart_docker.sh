#!/bin/bash

echo "********************************************************"
echo "DOWNLOAD CURRENT IMAGE "
echo "********************************************************"

sudo docker pull abhas23/starplatinum:latest > /dev/null

echo "********************************************************"
echo "RESTART DB AND SERVICE WEB "
echo "********************************************************"

cd /home/ec2-user/your-app-dir && \
  /usr/local/bin/docker-compose down

cd /home/ec2-user/your-app-dir && \
  /usr/local/bin/docker-compose up -d web

sleep 5
echo "********************************************************"
echo "DOCKER IMAGE UPDATED AND SERVICE RESTARTED "
echo "********************************************************"