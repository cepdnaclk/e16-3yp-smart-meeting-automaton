const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const newuserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      min: 1,
      max: 1024,
    },

    onetimeId: {
      type: String,
      required: true,
      default: "11111",
    },

    phone: {
      type: String,
      //  unique: true,
      min: 9,
      max: 10,
      // required: true,
    },

    name: {
      type: String,
      required: true,
      min: 1,
      max: 1024,
    },

    email: {
      type: String,
      required: true,
      // unique: true,
      min: 5,
      max: 60,
    },
  },
  {
    timestamps: true,
  }
);

const newuser = mongoose.model("newuser", newuserSchema);

module.exports = newuser;
