const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: 250,
    required: true
  },
  nickname: {
    type: String,
    required: false
  },
  command: {
    type: String,
    required: true
  }
 
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
