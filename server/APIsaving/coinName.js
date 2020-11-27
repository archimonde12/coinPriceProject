const API_URL = "https://api.coingecko.com/api/v3/coins/list";
const fetch = require("node-fetch");

async function loadCoinNameAndSaveToMongo(client) {
  try {
    //Load data
    let now = new Date();
    now = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const response = await fetch(API_URL);
    const responseBody = await response.json();
    const allCoinName = [];
    responseBody.forEach((coin) => allCoinName.push(coin));
    //Saving Data
    const database = client.db("coins");
    const collection = database.collection("coinNameData");
    //Check the number of elements that saved in mongoDB
    const findRes = await collection.find({});
    const result = await findRes.toArray();
    const sizeOfResult = result.length;
    if (sizeOfResult != allCoinName.length) {
      console.log("=================================================");
      const delRes = await collection.deleteMany();
      console.log(`${now}:`);
      console.log(`Old data ${delRes.deletedCount} coin data`);
      const insertRes = await collection.insertMany(allCoinName);
      console.log(`Update ${insertRes.insertedCount} coin data`);
      console.log("=================================================");
    } else {
      console.log(`${now}: Try to update but data have nothing new`);
    }
    return allCoinName;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = loadCoinNameAndSaveToMongo;
