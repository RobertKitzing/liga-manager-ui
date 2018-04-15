FROM alpine
RUN mkdir /app
COPY www /app/www
WORKDIR /app
