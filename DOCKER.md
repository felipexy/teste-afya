# Docker Setup - CryptoTracker

Este documento explica como usar Docker com o projeto CryptoTracker.

## Pré-requisitos

- Docker instalado
- Docker Compose instalado

## Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar ambiente de desenvolvimento com hot reload
yarn docker:dev

# Ou usar docker-compose diretamente
docker-compose --profile dev up --build
```

### Produção

```bash
# Iniciar em produção na porta 3000
yarn docker:prod

# Iniciar em produção na porta 8080
yarn docker:prod-custom

# Parar todos os containers
yarn docker:stop

# Limpar imagens e volumes não utilizados
yarn docker:clean
```

### Comandos Manuais

```bash
# Build da imagem de produção
docker build -t crypto-tracker .

# Executar container de produção
docker run -p 3000:3000 crypto-tracker

# Build da imagem de desenvolvimento
docker build -f Dockerfile.dev -t crypto-tracker-dev .

# Executar container de desenvolvimento
docker run -p 3000:3000 -v $(pwd):/app crypto-tracker-dev
```

## Estrutura dos Arquivos

- `Dockerfile` - Configuração para produção (multi-stage build)
- `Dockerfile.dev` - Configuração para desenvolvimento
- `docker-compose.yml` - Orquestração dos serviços
- `.dockerignore` - Arquivos ignorados no build

## Configurações

### Desenvolvimento

- Hot reload ativado
- Volumes montados para desenvolvimento
- Porta 3000 exposta

### Produção

- Build otimizado com multi-stage
- Usuário não-root (nextjs:1001)
- Health check configurado
- Telemetria desabilitada

## Health Check

O container de produção inclui um health check que verifica:

- Endpoint: `http://localhost:3000/api/health`
- Intervalo: 30 segundos
- Timeout: 3 segundos
- Retry: 3 tentativas

## Variáveis de Ambiente

- `NODE_ENV` - Ambiente (development/production)
- `NEXT_TELEMETRY_DISABLED` - Desabilita telemetria do Next.js
- `PORT` - Porta da aplicação (padrão: 3000)
- `HOSTNAME` - Hostname (padrão: 0.0.0.0)

## Troubleshooting

### Problemas Comuns

1. **Porta já em uso**

   ```bash
   # Verificar portas em uso
   lsof -i :3000

   # Usar porta alternativa
   docker run -p 8080:3000 crypto-tracker
   ```

2. **Permissões de arquivo**

   ```bash
   # Corrigir permissões no Linux
   sudo chown -R $USER:$USER .
   ```

3. **Limpeza de cache**

   ```bash
   # Limpar cache do Docker
   docker system prune -a

   # Rebuild sem cache
   docker build --no-cache -t crypto-tracker .
   ```

### Logs

```bash
# Ver logs do container
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f crypto-tracker
```

## Performance

- **Tamanho da imagem**: ~200MB (otimizado com multi-stage build)
- **Tempo de build**: ~2-3 minutos (primeira vez)
- **Tempo de startup**: ~10-15 segundos
