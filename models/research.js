// Some requirements
const getDb = require("../data/database").getDb;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class Research
{
    constructor(title, description, image_filename, adress,user)
    {
        this.title = title;
        this.description = description;
        this.image_filename = image_filename;
        this.adress = adress;
        this.user = user;
    }

    // For saving research in the database
    save(CALLBACK_FUNCTION)
    {
        const db = getDb();
        db.collection("researchs").insertOne(this).then(function(result)
        {
            CALLBACK_FUNCTION();
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    // For fetching all the researches with the given user id
    static fetchAllByUserId(userId, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const user_id = new ObjectId(userId);
        db.collection('researchs').find({'user._id' : user_id}).toArray().then(function(researchs)
        {
            CALLBACK_FUNCTION(researchs);
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    // Fetch 1 research with its given user id and research id
    static fetchResearchByBothId(userId, researchId, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const user_id = new ObjectId(userId);
        const research_id = new ObjectId(researchId);
        db.collection('researchs').find({
            'user._id': user_id,
            _id : research_id
        }).next().then(function(research)
        {
            CALLBACK_FUNCTION(research);
        }).catch(function(err)
        {
            console.log(err);
        });
    }
}

module.exports = Research;