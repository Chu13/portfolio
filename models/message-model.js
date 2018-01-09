const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const messageSchema = new Schema(

  {
      name: {
        type: String,
        required:[true, "Tell me your name."]
      },
      email: {
          type: String,
          required: [true, "Enter your email."]
      },
      phone:{
        type: String
      },
      message: {
        type: String,
        required: [true, "Type a message"]
      }
  }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
