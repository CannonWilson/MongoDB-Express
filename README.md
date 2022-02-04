# MongoDB + Express Practice

---

This fun little application connects to a MongoDB cluster and allows
the user to help track down superheroes by anonymously uploading
their real names.

My own cluster login and password are stored privately in a `.env`
file. You will need your MongoDB login and password for a user
on your own cluster. I created a database named 'test_db' and 
a collection within it named 'test_collection'. You can follow
my naming scheme, or you can edit the lines in "server.js" where
the database is queried or when a new document is inserted.

To get started, just clone this repository, `cd` into it, and
run `npm start`.