const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
      userFrom: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );



module.exports = model('Message', messageSchema);