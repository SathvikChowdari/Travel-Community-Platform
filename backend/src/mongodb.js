import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB server URL
const dbName = 'mydatabase'; // Replace with the name of your database
const collectionName = 'mycollection'; // Replace with the name of your collection

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect()
  .then(() => {
    console.log('Connected to the MongoDB server');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Document to insert
    const document = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
    };

    // Insert a single document
    collection.insertOne(document)
      .then(result => {
        console.log(`Inserted ${result.insertedCount} document into the collection`);
      })
      .catch(err => {
        console.error('Error inserting document', err);
      })
      .finally(() => {
        // Close the connection when done
        client.close();
      });
  })
  .catch(err => {
    console.error('Error connecting to the MongoDB server', err);
  });
