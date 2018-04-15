FROM alpine
RUN mkdir -p /var/www/ui
COPY www /var/www/ui
VOLUME /var/www/ui
