const mongoose = require('mongoose');
const parseMessage = require('../parseMessages');
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

messageSchema.statics.log = function(str, username) {
  const message = parseMessage(str, username);
  return this.create(message);
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
