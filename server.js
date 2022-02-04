const express = require('express')
const {MongoClient} = require('mongodb')
const parser = require('body-parser')
require('dotenv/config')

//////// Database setup

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// Connect to the database
const url = process.env.DB_CONNECTION // My username and password for my cluster is stored in a .env file
const client = new MongoClient(url)
try {
    client.connect( () => {
        console.log("connected to DB")
        listDatabases(client)
    })
} catch(err) {
    console.log(err)
}




/////// Express app and routes
const app = express()

app.use(parser.urlencoded({extended: true})) // won't work without body-parser middleware

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/test.html")
})

app.post('/api/users', (req, res) => {
    const obj = {
        superName: req.body.superName,
        normalName: req.body.normalName
    }
    async function insertDb(object) {
        await client.db("test_db").collection("test_collection").insertOne(obj)
    }
    insertDb(obj)
    console.log('Inserted: ', req.body)
    res.redirect("/")
})

app.get('/api/users', (req, res) => {

    async function find() {

        ///// Only find one
        // const cursor = await client.db("test_db").collection("test_collection").findOne()
        // res.send(cursor)

        /////// Find all (or can add query like shown below for alphabetically showing 2 documents with superNames containing 'uper')
        const cursor = await client.db("test_db").collection("test_collection").find()
        // const cursor = await client.db("test_db").collection("test_collection").find({superName: {"$regex" : "uper" }}).sort({sort: 1}).limit(2)

        const arr = []
        await cursor.forEach( (item) => {
            arr.push(item)
        })

        res.send(arr)
    }
    find()
})

app.listen(3000, () => {
    console.log("App created. You can view it at localhost:3000 in the browser.")
})