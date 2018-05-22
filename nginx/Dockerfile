# Use the standard Nginx image from Docker Hub
FROM nginx
# The Dockerfile's author
LABEL Abhas Sinha
COPY nginx.conf /etc/nginx/nginx.conf
# Port 8080 of the container will be exposed and then mapped to port
# 8080 of our host machine via Compose. This way we'll be able to 
# access the server via localhost:8080 on our host.
EXPOSE 8080

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]