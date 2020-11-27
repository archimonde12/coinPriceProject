const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { MongoClient } = require("mongodb");
//Datasource
const CoinAPI = require("./datasource/coin");
const CoinNameAPI = require("./datasource/coinName");
const UserAPI = require("./datasource/user");

const loadCoinNameAndSaveToMongo = require("./APIsaving/coinName");
const PERIOD = 60; //seconds

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    coinAPI: new CoinAPI(),
    coinNameAPI: new CoinNameAPI(client),
    userAPI: new UserAPI(client),
  }),
});
server.listen().then(({ url }) => {
  console.log(`
        Server is running!
        Listening on ${url}
        Explore at https://studio.apollographql.com/dev
      `);
  client.connect().then(() => {
    let now = new Date();
    now = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    console.log(`${now}: Connect successfull to mongo server`);
    console.log(`Start cycle update coinNameData every ${60} seconds`);
    loadCoinNameAndSaveToMongo(client);
    setInterval(() => {
      loadCoinNameAndSaveToMongo(client);
    }, PERIOD * 1000);
  });
});
