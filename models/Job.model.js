const { Schema, model } = require("mongoose");


const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    companyName: {
        type: String,
        required: [true, "Name is required"] 
    },
    location: {
      type:String,
      required: [true, "location is required"]
    },
    description: {
      type:String,
      required: [true, "Description is required"]
    },
    details: {
      type:String,
      required: [true, "details is required"]
    },
    salary: Number,
    Rating: Number,
    lastActiveAt: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }
)

const Job = model("Job", jobSchema);

module.exports = Job;