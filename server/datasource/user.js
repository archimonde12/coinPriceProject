class UserAPI {
  constructor(client) {
    this.client = client;
  }

  async createUser(email) {
    try {
      //Saving Data
      console.log(`Try to create new user data to local MongoDB`);
      const database = this.client.db("coins");
      const collection = database.collection("userData");
      //Check is email exist in collection
      const query = { email };
      const isEmailExist = await collection.findOne(query);

      if (!isEmailExist) {
        const newUserData = { id: email, email: email, subcribeList: [] };
        const insertRes = await collection.insertOne(newUserData);
        console.log(`insert ${insertRes.insertedCount} data`);
        return {
          success: true,
          message: "Create new data success",
          user: newUserData,
        };
      }
      return {
        success: false,
        message: "Email exist in database",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(email) {
    const database = this.client.db("coins");
    const collection = database.collection("userData");

    const query = { email };
    const findRes = await collection.findOne(query);
    console.log(findRes);
    return findRes;
  }

  async subcribe(coinId, email) {
    try {
      console.log(`${email} try to subcribe ${coinId}`);
      const database = this.client.db("coins");
      const collection = database.collection("userData");
      //Check is email exist in collection
      const query = { email };
      let isEmailExist = await collection.findOne(query);

      if (isEmailExist) {
        //If email exists
        let replaceDocument = isEmailExist;
        //Check coinId is exist in subcribeList
        if (replaceDocument.subcribeList.indexOf(coinId) >= 0) {
          return {
            success: false,
            message: `${coinId} already exist in subcribe list of ${email}`,
          };
        }
        replaceDocument.subcribeList.push(coinId);
        const replaceRes = await collection.findOneAndReplace(
          query,
          replaceDocument
        );
        return {
          success: true,
          message: "Subcribe successful",
        };
      }
      return {
        success: false,
        message: `${email} not exist in database`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async unSubcribe(coinId, email) {
    try {
      console.log(`${email} try to unsubcribe ${coinId}`);
      const database = this.client.db("coins");
      const collection = database.collection("userData");
      //Check is email exist in collection
      const query = { email };
      let isEmailExist = await collection.findOne(query);

      if (isEmailExist) {
        //If email exists
        let replaceDocument = isEmailExist;
        //Check coinId is exist in subcribeList
        let coinIndex = replaceDocument.subcribeList.indexOf(coinId);
        if (coinIndex < 0) {
          return {
            success: false,
            message: `${coinId} not exist in subcribe list ${email}`,
          };
        }
        replaceDocument.subcribeList.splice(coinIndex, 1);
        const replaceRes = await collection.findOneAndReplace(
          query,
          replaceDocument
        );
        return {
          success: true,
          message: "Unsubcribe successful",
        };
      }
      return {
        success: false,
        message: `${email} not exist in database`,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserAPI;
