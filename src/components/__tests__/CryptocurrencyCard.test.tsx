import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CryptocurrencyCard } from "../CryptocurrencyCard";
import { Cryptocurrency } from "@/types/crypto";

// Mock cryptocurrency data for testing
const mockCrypto: Cryptocurrency = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
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
};

const mockCryptoNegative: Cryptocurrency = {
  ...mockCrypto,
  price_change_percentage_24h: -3.45,
  price_change_24h: -1500,
};

describe("CryptocurrencyCard", () => {
  it("renders cryptocurrency information correctly", () => {
    render(<CryptocurrencyCard crypto={mockCrypto} />);

    // Check if name and symbol are displayed (symbol is lowercase in component)
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("btc")).toBeInTheDocument();

    // Check if price is displayed (Brazilian format uses US$ and periods/commas)
    expect(screen.getByText(/US\$ 45\.000,00/)).toBeInTheDocument();

    // Check if percentage change is displayed
    expect(screen.getByText("+2.27%")).toBeInTheDocument();

    // Check if market cap is displayed
    expect(screen.getByText("Market Cap")).toBeInTheDocument();
    expect(screen.getByText(/US\$ 850\.000\.000\.000,00/)).toBeInTheDocument();

    // Check if volume is displayed
    expect(screen.getByText("Volume 24h")).toBeInTheDocument();
    expect(screen.getByText(/US\$ 25\.000\.000\.000,00/)).toBeInTheDocument();

    // Check if rank is displayed
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("displays positive price change with green color and trending up icon", () => {
    render(<CryptocurrencyCard crypto={mockCrypto} />);

    const changeElement = screen.getByText("+2.27%");
    expect(changeElement).toHaveClass("text-green-600");

    // Check for green background
    const parentElement = changeElement.closest('[class*="bg-green-50"]');
    expect(parentElement).toBeInTheDocument();
  });

  it("displays negative price change with red color and trending down icon", () => {
    render(<CryptocurrencyCard crypto={mockCryptoNegative} />);

    const changeElement = screen.getByText("-3.45%");
    expect(changeElement).toHaveClass("text-red-600");

    // Check for red background
    const parentElement = changeElement.closest('[class*="bg-red-50"]');
    expect(parentElement).toBeInTheDocument();
  });

  it("calls onClick handler when card is clicked", () => {
    const mockOnClick = jest.fn();
    render(<CryptocurrencyCard crypto={mockCrypto} onClick={mockOnClick} />);

    // Find the card by looking for cursor-pointer class
    const card = screen.getByText("Bitcoin").closest(".cursor-pointer");

    if (card) {
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    } else {
      // Alternative: click on the actual card element
      const cardElement = screen
        .getByText("Bitcoin")
        .closest('[class*="rounded-lg border"]');
      expect(cardElement).toBeInTheDocument();
      if (cardElement) {
        fireEvent.click(cardElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      }
    }
  });

  it("handles image error gracefully", () => {
    render(<CryptocurrencyCard crypto={mockCrypto} />);

    const image = screen.getByAltText("Bitcoin") as HTMLImageElement;

    // Simulate image error
    fireEvent.error(image);

    // Check if fallback image source is set
    expect(image.src).toBe("http://localhost/placeholder-crypto.png");
  });
});
