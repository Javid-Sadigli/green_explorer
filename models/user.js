// Some requirements 
const getDb = require("../data/database").getDb;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
const Research = require('./research');

class User
{
    constructor(username, email, password, id)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        if(id)
        {
            this._id = new ObjectId(id);
        }
    }

    // For saving user database. 
    save(CALLBACK_FUNCTION)
    {
        if(!this._id)
        {
            this.score = 0;
            const db = getDb();
            db.collection('users').insertOne(this).then(function(result)
            {
                CALLBACK_FUNCTION();
            });
        }
        else
        {
            console.log("You cannot save an User with id.\nThe Id will automatically created by MongoDB.\n");
        }
    }

    // Find the user by id.
    static findById(id, CALLBACK_FUNCTION)
    {
        const db = getDb();
        const _id = new ObjectId(id);
        db.collection('users').find({_id : _id}).next().then(function(user)
        {
            CALLBACK_FUNCTION(user);
        }).catch(function(err)
        {
            console.log(err);
        });
    }

    // The user adds research
    addResearch(title, description, image_filename, adress, CALLBACK_FUNCTION)
    {
        const new_research = new Research(
            title, description,image_filename,adress,
            {
                username : this.username, 
                email : this.email,
                _id : this._id
            }
        ); 
        new_research.save(CALLBACK_FUNCTION);
    }

    // Get all researchs belongs to this user
    getResearchs(CALLBACK_FUNCTION)
    {
        Research.fetchAllByUserId(this._id, CALLBACK_FUNCTION);
    }

    // Get a research by id that belongs to this user
    getResearchById(researchId, CALLBACK_FUNCTION)
    {
        Research.fetchResearchByBothId(this._id, researchId, CALLBACK_FUNCTION);
    }
}

module.exports = User;


