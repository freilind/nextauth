import { MongoClient } from 'mongodb';

const CONNECTION_STRING = `mongodb+srv://${
      process.env.mongodb.username}:${
      process.env.mongodb.password}@${
      process.env.mongodb.clustername}.${
      process.env.mongodb.domain}/${
      process.env.mongodb.database}?retryWrites=true&w=majority`;

export const connectToDatabase = async() => {
  try {
    const DB_CLIENT = new MongoClient(CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true });
    return await DB_CLIENT.connect();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
