#!/bin/bash
echo "********************************************************"
echo "UPDATING AND RESTARTING "
echo "********************************************************"
hostname
pwd
echo "--------------------------------------------------------"

sudo docker pull your-docker-hub-account/your-docker-image-name:latest
sudo /home/ec2-user/restart-docker.sh
sudo docker system prune -f

echo "---------- UPDATE DONE --------------------------------"