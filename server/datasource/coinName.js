class CoinNameAPI {
  constructor(client) {
    this.client = client;
  }

  async getAllCoinName(limit, start) {
    try {
      //Saving Data
      const database = this.client.db("coins");
      const collection = database.collection("coinNameData");
      //Check the number of elements that saved in mongoDB
      const findRes = await collection.find({}).limit(limit).skip(start);
      const result = await findRes.toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CoinNameAPI;
