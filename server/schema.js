const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    coin(id: ID!): Coin
    user(email: String!): User
    coins(limit: Int, start: Int): [Coin]
  }
  type Coin {
    id: ID!
    name: String
    symbol: String
    price: Float
  }
  type User {
    id: ID!
    email: String!
    subcribeList: [String]
  }
  type Mutation {
    login(email: String!): String
    register(email: String!): UserCreateResponse!
    subcribe(coinId: ID!, email: String!): SubcribeUpdateResponse!
    unSubcribe(coinId: ID!, email: String!): SubcribeUpdateResponse!
  }

  type UserCreateResponse {
    success: Boolean!
    message: String
    user: User
  }

  type SubcribeUpdateResponse {
    success: Boolean!
    message: String
    subcribeList: [String]
  }
`;

module.exports = typeDefs;
