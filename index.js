// This file will contain our Node application that will be interact with our MongoDB server
const MongoClient = require('mongodb').MongoClient;  //The MongoClient property enable to connect to our MongoDb server.
const assert = require('assert');

//To start up connection to the mongoDB server we create the url which the mongodb server can be access.
const url = 'mongo://localhost:27017/';
const dbname = 'conFusion';      //We create the conFusion database in the previous exercise.

//To acces to the server we do:
MongoClient.connect(url, (err, client) => {//The connect() method allow us to connect to the MongoClient from our mongoDB server.
    //client is use to connect to database and perform various actions.
    assert.equal(err, null); // the assert will check here if the error is null or not.

    //if error is null
    console.log('Connected correctly to the server');
    const db = client.db(dbname);   // to connect to our database. Now the db const will provide us various method to interact with our server.
    const collection = db.collection('dishes'); //We try to acces to dishes collection within our database.

    //Try now to insert one document(object) into our collection
    collection.insertOne({"name": "RandomName", "Description": "test"}, (err, result) => {
        //inside this callback function,  if the result is obtain we are able to access collection and perform further operation
        assert.equal(err, null);

        // if error is null it mean that everythings is ok
        console.log('After insert:\n');
        console.log(result.ops);   //the ops property of result tell how many operations has been made successfully.

        //now we will try to search for all the record inside the collection, to do that, we provide an empty JSON to find() method.
        collection.find({}).toArray((err, docs) => {        //toArray() enable to convert result to an array of a JSON object.
            //the docs parameter will return all the objects in the collection that's match with the specified criteria in the find().
            assert.equal(err, null);

            console.log('Found:\n');
            console.log(docs);


            db.dropCollectio('dishes', (err, result) =>{  //dropCollection(), allow us to drop the specified collection from the database, so here i'm going to remove dishes collection from my database.
                assert.equal(err, null);

                client.close(); //So we close the connection to the database at this point.
            });
        });     
    });
});                                                         