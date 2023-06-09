const { Schema, model } = require("mongoose");


const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    location: {
      type:String,
      required: [true, "location is required"]
    },
    jobDescription: {
      type:String,
      required: [true, "Description is required"]
    },
    details: {
      type:String,
      required: [true, "details is required"]
    },
    salary:{
      type: String,
      default: 'not specified',
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)
// new comment
const Job = model("Job", jobSchema);

module.exports = Job;