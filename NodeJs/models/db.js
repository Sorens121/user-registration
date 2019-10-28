const mongoose = require('mongoose');
require('./user.model');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err) {
        console.log('MongoDb connection established...');
    } else {
        console.log('Error is connection: '+ JSON.stringify(err, undefined, 2));
    }
});