const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    thumbnailUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

postSchema.virtual('id').get(function () {
  return this._id;
});

module.exports = model('post', postSchema);
