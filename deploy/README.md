# AMSR deployment

- Web: Vercel, `https://amsr.todari.dev`
- API: todari-consolidated EC2, `https://api.amsr.todari.dev`
- API data: Docker named volume `amsr_amsr_data`, atomic JSON store
- Admin: Vercel Basic Auth protected `/admin`

## DNS

Gabia DNS records:

| Host | Type | Value |
| --- | --- | --- |
| `amsr` | A | `76.76.21.21` |
| `api.amsr` | A | `52.78.45.209` |

## EC2

The AMSR stack is isolated under `~/amsr` and binds only to loopback port 4311.

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
curl --fail http://127.0.0.1:4311/healthz
sudo cp deploy/nginx-api.amsr.todari.dev.conf /etc/nginx/sites-available/api.amsr.todari.dev
sudo ln -s /etc/nginx/sites-available/api.amsr.todari.dev /etc/nginx/sites-enabled/api.amsr.todari.dev
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.amsr.todari.dev --redirect
```

Back up the application store without reading its contents:

```bash
docker run --rm -v amsr_amsr_data:/data -v /home/ubuntu/backups:/backup alpine \
  cp /data/applications.json /backup/amsr-applications-$(date +%Y%m%d-%H%M%S).json
```
