
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

const Schema = mongoose.Schema;

const thingSchema = new Schema({
  name: String,
  value: Number
});

let Thing = mongoose.model('Thing', thingSchema);

let newEncoder = Thing({
  name: 'encoder1',
  value: 10
});

newEncoder.save((err) => {
  if (err) throw err;
  console.log("encoder saved");
}).then(
  Thing.find({name: 'encoder1'}, (err, thing) => {
    if (err) throw err;

    console.log(thing);
}));

