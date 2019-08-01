const mongoose = require('mongoose');
const parseMessage = require('../parseMessages');
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: 250,
    required: function() {
      return this.command !== 'nickname';
    }
  },
  nickname: {
    type: String,
    required: false
  },
  command: {
    type: String,
    required: true
  },
  args: {
    type: String
  }
 
}, { timestamps: true });

messageSchema.statics.log = function(str, username) {
  const message = parseMessage(str, username);
  return this.create({ ...message, nickname: username });
 
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
