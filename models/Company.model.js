const { Schema } = require('mongoose');
const User = require("./User.model");

const companySchema = new Schema(
  {
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
    location: {
      type: String,
      required: [false, "Location required"],
    },
    employees: Number
  },
  {
    timestamps: true,
  }
);

const Company = User.discriminator("Company", companySchema)

module.exports = Company;