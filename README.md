# Build steps

1. yarn install
2. npm start or npm run build
3. Be Happy :)

# Client Generation
 npm run nswag

 # webserver Config

 simply route request to index.html (spa config)

     location / {
        root /var/www;
        try_files $uri $uri/ /index.html;
    }
nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ui/www:/var/www
