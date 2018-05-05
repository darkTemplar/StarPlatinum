#!/bin/bash
echo "********************************************************"
echo "COPY UPDATE SCRIPTS TO EC2-INSTANCE"
echo "********************************************************"
scp -i ~/.ssh/offerdate-production.pem  deploy/update_and_restart.sh \
deploy/restart_docker.sh \
ec2-13-56-233-163.us-west-1.compute.amazonaws.com:./

echo "********************************************************"
echo "UPDATE EC2-INSTANCE"
echo "********************************************************"
ssh -i ~/.ssh/offerdate-production.pem \
 ec2-13-56-233-163.us-west-1.compute.amazonaws.com \
 sudo ./update_and_restart.sh

echo "********************************************************"
echo "DEPLOYED `date`"
echo "********************************************************"