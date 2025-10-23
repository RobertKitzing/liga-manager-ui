#!/bin/sh

envsubst < /nginx-ui-conf/appsettings.web.json.template > /ui/browser/appsettings.json

exec "$@"