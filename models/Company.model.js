const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    name:{
      type: String,
      required: [true, "Please provide a company name"]
    },
    url: { 
      type: String,
      required: false
    },
    description: {
      type: String,
      required: [true, "Please provide a company name"]
    },
    rating: {
      type: Number,
      required: [true, "Please provide a company name"]
    },
    established: Number
  }
);

module.exports = model('Company', companySchema);