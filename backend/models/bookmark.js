const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const BookmarkSchema = new Schema({
  title: { type: String, required: true, default: '' },
  url: { type: String, required: true, default: '' },
  pkg: { type: ObjectId, ref: 'Pkg' },
  createDate: { type: Date, default: Date.now },
});


mongoose.model('Bookmark', BookmarkSchema);
