const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    coin: (_, { id }, { dataSources }) => dataSources.coinAPI.getCoin(id),
    coins: (_, { limit = 30, start = 0 }, { dataSources }) =>
      dataSources.coinNameAPI.getAllCoinName(limit, start),
    user: (_, { email }, { dataSources }) => dataSources.userAPI.getUser(email),
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.getUser(email);
      if (user) {
        user.token = jwt.sign(
          { id: user.id, email: user.email },
          "secret_key",
          {
            expiresIn: 60 * 60,
          }
        );
        return user.token;
      }
      if (!user) {
        console.log("User not in database");
      }
    },
    register: (_, { email }, { dataSources }) =>
      dataSources.userAPI.createUser(email),
    subcribe: (_, { coinId, email }, { dataSources }) =>
      dataSources.userAPI.subcribe(coinId, email),
    unSubcribe: (_, { coinId, email }, { dataSources }) =>
      dataSources.userAPI.unSubcribe(coinId, email),
  },
};
