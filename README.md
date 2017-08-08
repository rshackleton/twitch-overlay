# Twitch Overlay

Twitch Overlay with Just Giving donation alerts.

## Deployment

This can be deployed using `docker-compose` and [nginx-proxy](https://github.com/rshackleton/nginx-proxy).

```
docker create network reverse-proxy
docker-compose -f docker-compose.yml -f docker-compose.prd.yml up -d --build
```

A `.env` file needs to be present in the same folder as `docker-compose.yml` with the following variables:

```
WEB_HOST=
WEB_PORT=
ADMIN_HOST=
ADMIN_PORT=
API_HOST=
API_PORT=
API_PROTOCOL=
EMAIL_ADDRESS=
JUSTGIVING_APP_ID=
JUSTGIVING_PAGE=
LOGGLY_SUBDOMAIN=
LOGGLY_TOKEN=
POLL_INTERVAL=
```
