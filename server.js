const express = require('express')
const {MongoClient} = require('mongodb')
const parser = require('body-parser')
require('dotenv/config')

const app = express()

app.use(parser.urlencoded({extended: true})) // won't work without body-parser middleware

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/test.html")
})

const url = process.env.DB_CONNECTION
const client = new MongoClient(url)
try {
    client.connect( () => {
        console.log("connected to DB")
    })
} catch(err) {
    console.log(err)
}

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

app.listen(3000)