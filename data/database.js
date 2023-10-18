// Import mongobd driver
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

// Connect the database
const mongoConnect = (CALLBACK_FUNCTION) => {
    MongoClient.connect('mongodb+srv://heydaraliyevhackathon:heydaraliyev123@mycluster.0n0iq50.mongodb.net/greenexplorer?retryWrites=true&w=majority').then((client) => {
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

