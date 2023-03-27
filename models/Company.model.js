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
    companyDescription: {
      type: String,
      required: [true, "Please provide a company description"]
    },
    rating: {
      type: Number,
      required: [false, "Please provide a company rating"]
    },
    established: Number,
    employees: Number
  }
);

const Company = model("Company", companySchema);

module.exports = Company;