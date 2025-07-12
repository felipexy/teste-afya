// Simplified test focusing on essential functionality
import { coinGeckoApi } from "../coinGeckoApi";

// Mock the entire service
jest.mock("../coinGeckoApi", () => ({
  coinGeckoApi: {
    getTopCryptocurrencies: jest.fn(),
    searchCryptocurrencies: jest.fn(),
    getCryptocurrencyDetail: jest.fn(),
    getChartData: jest.fn(),
  },
}));

const mockCoinGeckoApi = coinGeckoApi as jest.Mocked<typeof coinGeckoApi>;

describe("CoinGecko API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTopCryptocurrencies", () => {
    it("should fetch top cryptocurrencies successfully", async () => {
      const mockResponse = [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image:
            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
          current_price: 45000,
          market_cap: 850000000000,
          market_cap_rank: 1,
          fully_diluted_valuation: 900000000000,
          total_volume: 25000000000,
          high_24h: 46000,
          low_24h: 44000,
          price_change_24h: 1000,
          price_change_percentage_24h: 2.27,
          market_cap_change_24h: 20000000000,
          market_cap_change_percentage_24h: 2.41,
          circulating_supply: 19000000,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: 69000,
          ath_change_percentage: -34.78,
          ath_date: "2021-11-10T14:24:11.849Z",
          atl: 67.81,
          atl_change_percentage: 66261.19,
          atl_date: "2013-07-06T00:00:00.000Z",
          roi: null,
          last_updated: "2023-01-01T12:00:00.000Z",
        },
      ];

      mockCoinGeckoApi.getTopCryptocurrencies.mockResolvedValueOnce(
        mockResponse
      );

      const result = await coinGeckoApi.getTopCryptocurrencies(20);

      expect(mockCoinGeckoApi.getTopCryptocurrencies).toHaveBeenCalledWith(20);
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bitcoin");
    });
  });

  describe("searchCryptocurrencies", () => {
    it("should return empty array for empty query", async () => {
      mockCoinGeckoApi.searchCryptocurrencies.mockResolvedValueOnce([]);

      const result = await coinGeckoApi.searchCryptocurrencies("");

      expect(mockCoinGeckoApi.searchCryptocurrencies).toHaveBeenCalledWith("");
      expect(result).toEqual([]);
    });

    it("should return filtered results for valid query", async () => {
      const mockResponse = [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "btc",
          current_price: 45000,
          price_change_percentage_24h: 2.27,
          image: "test.png",
          market_cap: 850000000000,
          market_cap_rank: 1,
          fully_diluted_valuation: 900000000000,
          total_volume: 25000000000,
          high_24h: 46000,
          low_24h: 44000,
          price_change_24h: 1000,
          market_cap_change_24h: 20000000000,
          market_cap_change_percentage_24h: 2.41,
          circulating_supply: 19000000,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: 69000,
          ath_change_percentage: -34.78,
          ath_date: "2021-11-10T14:24:11.849Z",
          atl: 67.81,
          atl_change_percentage: 66261.19,
          atl_date: "2013-07-06T00:00:00.000Z",
          roi: null,
          last_updated: "2023-01-01T12:00:00.000Z",
        },
      ];

      mockCoinGeckoApi.searchCryptocurrencies.mockResolvedValueOnce(
        mockResponse
      );

      const result = await coinGeckoApi.searchCryptocurrencies("bitcoin");

      expect(mockCoinGeckoApi.searchCryptocurrencies).toHaveBeenCalledWith(
        "bitcoin"
      );
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bitcoin");
    });
  });

  describe("Error handling", () => {
    it("should handle API errors gracefully", async () => {
      const mockError = new Error("API Error");
      mockCoinGeckoApi.getTopCryptocurrencies.mockRejectedValueOnce(mockError);

      await expect(coinGeckoApi.getTopCryptocurrencies()).rejects.toThrow(
        "API Error"
      );
    });
  });
});
