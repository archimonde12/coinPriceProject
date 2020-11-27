const { RESTDataSource } = require("apollo-datasource-rest");

class CoinAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.coingecko.com/api/v3/coins/";
  }

  async getCoin(id) {
    try {
      const query = id;
      const response = await this.get(query);
      if (response) {
        return {
          id: response.id,
          name: response.name,
          symbol: response.symbol,
          price: response.market_data.current_price.usd,
        };
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAllCoinName() {}
}

module.exports = CoinAPI;
