const connectToMongo = require('./db'); // Imported Db.js file.
const express = require('express');
var cors = require('cors');

connectToMongo(); // Here, we call the function of db.js for connecting to mongoDB.

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // We have to use this middleware for getting req.body in console.
// Available Routes
app.use('/api/auth', require('./routes/auth')); // This is api (auth) of routes.
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send("Hello, I am api");
// })

app.listen(port, () => {
  console.log(`SkyNotes backend listening on port ${port}`);
})


// Note: npm run serve is used to run the index.js instead of nodemon .\index.js
// WE can also use node index.js to run the server.