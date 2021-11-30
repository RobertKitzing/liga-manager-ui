[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3f9f908f12c847c3a0675cef370feed6)](https://app.codacy.com/app/RobertKitzing/liga-manager-ui?utm_source=github.com&utm_medium=referral&utm_content=RobertKitzing/liga-manager-ui&utm_campaign=Badge_Grade_Dashboard)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/de0e41571bc64133a31028d844b382b8)](https://www.codacy.com/app/RobertKitzing/liga-manager-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=RobertKitzing/liga-manager-ui&amp;utm_campaign=Badge_Coverage)
[![Build](https://github.com/RobertKitzing/liga-manager-ui/actions/workflows/main.yml/badge.svg)](https://github.com/RobertKitzing/liga-manager-ui/actions/workflows/main.yml)

# Liga Manager UI

## Documentation

https://robertkitzing.github.io/liga-manager-ui/

## Development workflow

```bash
docker-compose up -d
```

### Frontend
```bash
docker exec -it liga-manager-ui-ui-1 yarn start
```

or

```bash
docker exec -it liga-manager-ui-ui-1 /bin/sh
yarn start
```
Angular dev server should start at:

http://localhost:3098/

### Backend

Create Admin user:

```bash
docker exec -it liga-manager-ui-api-1 lima app:create-user
```
