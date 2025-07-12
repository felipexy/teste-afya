import axios, { AxiosInstance } from "axios";
import {
  Cryptocurrency,
  CryptocurrencyDetail,
  ChartData,
  ChartPoint,
} from "@/types/crypto";

// Create axios instance factory for better testability
export const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    timeout: 10000,
  });

  // Add request interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout. Please check your connection.");
      }
      throw new Error(error.response?.data?.error || "Failed to fetch data");
    }
  );

  return instance;
};

// Default instance
const api = createApiInstance();

export const coinGeckoApi = {
  // Get top cryptocurrencies by market cap
  async getTopCryptocurrencies(limit: number = 20): Promise<Cryptocurrency[]> {
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: limit,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });
    return response.data;
  },

  // Search cryptocurrencies by name or symbol
  async searchCryptocurrencies(query: string): Promise<Cryptocurrency[]> {
    if (!query.trim()) return [];

    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: "",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });

    const allCoins = response.data as Cryptocurrency[];
    return allCoins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 20);
  },

  // Get detailed information about a specific cryptocurrency
  async getCryptocurrencyDetail(id: string): Promise<CryptocurrencyDetail> {
    const response = await api.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: true,
        sparkline: false,
      },
    });

    const data = response.data;
    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image.large,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      fully_diluted_valuation:
        data.market_data.fully_diluted_valuation?.usd || null,
      total_volume: data.market_data.total_volume.usd,
      high_24h: data.market_data.high_24h.usd,
      low_24h: data.market_data.low_24h.usd,
      price_change_24h: data.market_data.price_change_24h,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap_change_24h: data.market_data.market_cap_change_24h,
      market_cap_change_percentage_24h:
        data.market_data.market_cap_change_percentage_24h,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      ath: data.market_data.ath.usd,
      ath_change_percentage: data.market_data.ath_change_percentage.usd,
      ath_date: data.market_data.ath_date.usd,
      atl: data.market_data.atl.usd,
      atl_change_percentage: data.market_data.atl_change_percentage.usd,
      atl_date: data.market_data.atl_date.usd,
      roi: data.market_data.roi,
      last_updated: data.last_updated,
      description: data.description,
      links: data.links,
      genesis_date: data.genesis_date,
      sentiment_votes_up_percentage: data.sentiment_votes_up_percentage,
      sentiment_votes_down_percentage: data.sentiment_votes_down_percentage,
      coingecko_rank: data.coingecko_rank,
      coingecko_score: data.coingecko_score,
      developer_score: data.developer_data.forks + data.developer_data.stars,
      community_score: data.community_score,
      liquidity_score: data.liquidity_score,
      public_interest_score: data.public_interest_score,
    };
  },

  // Get historical chart data for 7 days
  async getChartData(id: string, days: number = 7): Promise<ChartPoint[]> {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
        interval: "daily",
      },
    });

    const data = response.data as ChartData;

    return data.prices.map((price, index) => ({
      date: new Date(price[0]).toISOString().split("T")[0],
      price: price[1],
      volume: data.total_volumes[index][1],
      marketCap: data.market_caps[index][1],
    }));
  },
};
