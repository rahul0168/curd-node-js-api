const mongoose = require('mongoose');

// connect to MongoDB database
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

    
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = mongoose;