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
EMAIL_ADDRESS=admin@example.com
ADMIN_HOST=admin.example.com
ADMIN_PORT=3001
WEB_HOST=www.example.com
WEB_PORT=3000
```
