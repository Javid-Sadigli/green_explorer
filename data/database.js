// Import mongobd driver
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

// Connect the database
const mongoConnect = (CALLBACK_FUNCTION) => {
    MongoClient.connect('mongodb+srv://javidsadiglimongodbclusters:yo2y7F5hixWihDwM@cluster0.1cske.mongodb.net/green_explorer?retryWrites=true&w=majority&appName=Cluster0').then((client) => {
        _db = client.db();
        CALLBACK_FUNCTION(client);
    }).catch((err) => {
        console.log(err);
    });
};
const getDb = () => {
    if(_db)
    {
        return _db;
    }
    throw 'No database found!';
}

// Export functions
module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

