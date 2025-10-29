[![liga-manager](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/dnpc8n/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/dnpc8n/runs)
[![Main Pipeline](https://github.com/RobertKitzing/liga-manager-ui/actions/workflows/main.yml/badge.svg)](https://github.com/RobertKitzing/liga-manager-ui/actions/workflows/main.yml)

# Development workflow

```bash
docker-compose up -d
```

```bash
npx nx run liga-manager-ui-web:serve
```

Go to http://localhost:4200

# Environment Variables

- USE_IMGPROXY 
    - "false" = dont use imgproxy at all
    - "true" = get all Images from imgproxy
- USE_LOCAL_ASSETS
    - Only useful for the app variant, if true the app loads every image wich ist already part of the bundle directly (imgurl will not be prefixed with HOST). More or less unrelated to USE_IMGPROXY, as team-logos are not part of the bundle
- GOOGLE_MAPS_API_KEY
- TZ
    - Timezone treated as "Home"
