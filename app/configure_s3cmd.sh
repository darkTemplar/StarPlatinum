#!/bin/bash
# configure_s3cmd.sh

# configure s3cmd for docker.

# Wait until Postgres is ready
echo "Aws access key is ${AWS_ACCESS_KEY}"
s3cmd --configure --access_key=$AWS_ACCESS_KEY --secret_key=$AWS_SECRET_KEY -s --no-encrypt --dump-config 2>&1 | tee /app/.s3cfg