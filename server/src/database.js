const mongoClient = require('mongodb').MongoClient;

const mongoDbUrl = process.env.DATABASE_URL;
let mongodb;

function connect(callback) {
  mongoClient.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
      console.log(`ERROR: (${err.message})${err}`);
    } else {
      mongodb = db.db(process.env.DATABASE_NAME);

      console.log('Succsessfully connect to Database');

      callback();
    }
  });
}

function get() {
  return mongodb;
}

function close() {
  mongodb.close();
}

module.exports = {
  connect,
  get,
  close
};
