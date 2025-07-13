# CryptoTracker

A modern, responsive cryptocurrency tracking application built with Next.js 15, TypeScript, and React Query. Features real-time data from CoinGecko API with a beautiful dark/light theme design.

## 🚀 Features

- **Real-time Data**: Live cryptocurrency prices and market data
- **Top 20 Cryptocurrencies**: Sorted by market capitalization
- **Dark/Light Theme**: Beautiful theme switching with custom backgrounds
- **Search Functionality**: Find cryptocurrencies by name or symbol
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error states with retry functionality
- **Top Loading Bar**: Visual feedback for data fetching operations
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **UI Components**: shadcn/ui + Lucide React icons
- **API**: CoinGecko API
- **Testing**: Jest + React Testing Library
- **Deployment**: Docker support

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── crypto/[id]/       # Cryptocurrency detail page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── Background.tsx    # Theme-based background component
│   ├── CryptocurrencyCard.tsx
│   ├── CryptoChart.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LoadingCard.tsx
│   ├── MainContent.tsx
│   ├── SearchBar.tsx
│   └── ThemeToggle.tsx
├── constants/            # Application constants
│   └── app.ts           # Centralized configuration
├── hooks/               # Custom React hooks
│   ├── useAppState.ts   # Main application state management
│   └── useCryptocurrency.ts
├── providers/           # React context providers
│   ├── QueryProvider.tsx
│   └── ThemeProvider.tsx
├── services/            # API services
│   └── coinGeckoApi.ts
├── types/               # TypeScript type definitions
│   └── crypto.ts
└── utils/               # Utility functions
    └── index.ts
```

## 🎨 Architecture Highlights

### **Component Organization**

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components are designed to be reusable across the application
- **Props Interface**: Clear TypeScript interfaces for all component props
- **Documentation**: Comprehensive JSDoc comments for all components

### **State Management**

- **Custom Hooks**: Centralized state management with `useAppState`
- **React Query**: Efficient data fetching and caching
- **Theme Management**: Context-based theme switching

### **Configuration Management**

- **Constants File**: Centralized configuration in `src/constants/app.ts`
- **Environment Variables**: Proper environment variable handling
- **Type Safety**: Full TypeScript coverage

### **Performance Optimizations**

- **React Query**: Intelligent caching and background updates
- **Component Memoization**: Optimized re-renders
- **Lazy Loading**: Efficient code splitting
- **Image Optimization**: Next.js Image component usage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crypto-tracker
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Run the development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage

## 🧪 Testing

The application includes comprehensive testing:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API service tests
- **Coverage**: ~75% code coverage
- **Mocking**: Proper API mocking for tests

Run tests with:

```bash
yarn test
```

## 🐳 Docker Deployment

### Build the image

```bash
docker build -t crypto-tracker .
```

### Run the container

```bash
docker run -p 3000:3000 crypto-tracker
```

## 🌟 Key Features Implementation

### **Real-time Data Fetching**

- React Query for efficient data management
- Automatic background updates
- Optimistic updates for better UX

### **Theme System**

- Context-based theme management
- Custom CSS-in-JS backgrounds
- Smooth theme transitions

### **Responsive Design**

- Mobile-first approach
- Tailwind CSS for responsive utilities
- Optimized layouts for all screen sizes

### **Error Handling**

- Graceful error boundaries
- User-friendly error messages
- Retry mechanisms

### **Performance**

- Code splitting and lazy loading
- Optimized bundle size
- Efficient re-renders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/api/documentation) for cryptocurrency data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide React](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query) for data fetching

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
