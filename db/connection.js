const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env["MONGO_USERNAME"]}:${process.env["MONGO_PASSWORD"]}@rc.3bhtb.mongodb.net/?retryWrites=true&w=majority&appName=RC`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = { client };
