const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established succesfully");
}).on('error', error => console.log(`Error is ${error}`))

const issuesRouter = require('./routes/issues')
app.use('/api/issues', issuesRouter )

app.get('/', (req, res) => {
    res.send('aaa')
})

app.listen(process.env.PORT || 8000, () => console.log('server is up!'))