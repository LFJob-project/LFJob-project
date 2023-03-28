const {Schema} = require("mongoose");
const User = require("./User.model");

const employeeSchema = new Schema({
    location: {
        type: String,
        required: [false, "Location required"]
      },
      telephoneNumber: {
        type: Number,
        required: false
      },
      age: Number,
},
{
    timestamps: true,
})

const Employee = User.discriminator("Employee", employeeSchema);

module.exports = Employee;
