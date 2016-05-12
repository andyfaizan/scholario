const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const UniversitySchema = new Schema({
  name: { type: String, default: '' },
  alias: { type: String, default: '' },
});


mongoose.model('University', UniversitySchema);
