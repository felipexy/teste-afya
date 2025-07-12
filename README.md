# 🚀 CryptoTracker - Monitor de Criptomoedas

Uma aplicação moderna para monitorar as top 20 criptomoedas em tempo real, desenvolvida com Next.js 15, TypeScript, Tailwind CSS e React Query.

## ✨ Funcionalidades

- 📊 **Lista das Top 20 Criptomoedas** - Ordenadas por market cap
- 🔍 **Busca Inteligente** - Busque por nome ou símbolo com debounce
- 📈 **Gráficos de 7 dias** - Visualize tendências de preços
- 🌙 **Tema Dark/Light** - Interface adaptável
- ⚡ **Cache Inteligente** - React Query para performance otimizada
- 📱 **Design Responsivo** - Funciona em todos os dispositivos
- 🎨 **UI Moderna** - Design minimalista com shadcn/ui
- 🛡️ **TypeScript** - Tipagem completa para maior segurança

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui + Radix UI
- **Estado/Cache**: TanStack React Query
- **Gráficos**: Recharts
- **API**: CoinGecko API
- **Testes**: Jest + React Testing Library
- **Container**: Docker

## 📋 Pré-requisitos

- Node.js 18+
- Yarn ou npm
- Docker (opcional)

## 🚀 Como Executar

### 1. Instalação Local

```bash
# Clone o repositório
git clone <repository-url>
cd teste-afya

# Instale as dependências
yarn install

# Execute em desenvolvimento
yarn dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 2. Com Docker

```bash
# Build da imagem
yarn docker:build

# Execute o container
yarn docker:run
```

### 3. Build para Produção

```bash
# Build da aplicação
yarn build

# Execute em produção
yarn start
```

## 🧪 Testes

```bash
# Execute todos os testes
yarn test

# Execute testes em modo watch
yarn test:watch

# Execute testes com coverage
yarn test:coverage
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── crypto/[id]/       # Página de detalhes da crypto
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn)
│   ├── CryptocurrencyCard.tsx
│   ├── SearchBar.tsx
│   ├── CryptoChart.tsx
│   └── ThemeToggle.tsx
├── hooks/                # Custom hooks
│   └── useCryptocurrency.ts
├── lib/                  # Utilitários
│   └── utils.ts
├── providers/            # Context providers
│   ├── QueryProvider.tsx
│   └── ThemeProvider.tsx
├── services/             # Serviços de API
│   └── coinGeckoApi.ts
└── types/                # Tipos TypeScript
    └── crypto.ts
```

## 🎨 Funcionalidades Implementadas

### ✅ Requisitos Básicos

- [x] Listar top 20 moedas por market cap
- [x] Busca por nome de moeda
- [x] Página de detalhes com gráfico de 7 dias
- [x] Loading states e tratamento de erros

### ✅ Requisitos Técnicos

- [x] React Query para cache
- [x] 2 testes unitários
- [x] Dockerfile

### ✅ Diferenciais

- [x] Tema dark/light
- [x] Design minimalista e moderno
- [x] shadcn/ui components
- [x] TypeScript completo
- [x] Responsivo
- [x] Debounce na busca
- [x] Error boundaries
- [x] Loading skeletons

## 🔧 Scripts Disponíveis

- `yarn dev` - Executa em desenvolvimento
- `yarn build` - Build para produção
- `yarn start` - Executa build em produção
- `yarn lint` - Executa linting
- `yarn test` - Executa testes
- `yarn test:watch` - Executa testes em modo watch
- `yarn test:coverage` - Executa testes com coverage
- `yarn docker:build` - Build da imagem Docker
- `yarn docker:run` - Executa container Docker

## 📊 API

Este projeto utiliza a [CoinGecko API](https://www.coingecko.com/api/documentation) gratuita para obter dados de criptomoedas em tempo real.

### Endpoints utilizados:

- `/coins/markets` - Lista de criptomoedas
- `/coins/{id}` - Detalhes específicos
- `/coins/{id}/market_chart` - Dados históricos para gráficos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [CoinGecko](https://www.coingecko.com/) pela API gratuita
- [shadcn/ui](https://ui.shadcn.com/) pelos componentes
- [Lucide](https://lucide.dev/) pelos ícones
- [Recharts](https://recharts.org/) pelos gráficos
