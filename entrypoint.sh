#!/bin/sh

envsubst < /nginx-ui-conf/appsettings.web.json.template > /ui/browser/appsettings.json

[ -z "$@" ] && nginx -g 'daemon off;' || $@