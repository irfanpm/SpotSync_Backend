const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  userId: Object,
  serviceName: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Address:  {
    type: String,
    required: true,
  },
  Whatsapp: Number,
  Email: String,
  Website: String,
  Instagram: String,
  StreetAdrress: String,
  Timing: String,
  State: String,
  City: String,
  Description: String,
  Features: String,
  isApproved:Boolean,
  Image: {
    type: Array,
    required: true,
  },
  Location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  isBlock: Boolean,
  Avgrating: Number,
  Ratingcount: Number,
});
serviceSchema.index({ Location: "2dsphere" });
module.exports = mongoose.model("service", serviceSchema);
