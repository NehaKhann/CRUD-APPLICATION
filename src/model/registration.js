const mongoose = require("mongoose");
const validator = require("validator")

//schema

const employeeSchema = new mongoose.Schema({
    Fullname:{
        type:String,
        required:"This is required",
        trim:true,
    },

    Email:{
        type:String,
        required:true,
        unique:true,

      
    },

    Mobile:{
        type:String,
        required:true,
        unique:true,
      
    },
    City:{
        type:String,
        required:true
    },
})
employeeSchema.path("Email").validate((value)=>{
    return validator.isEmail(value);
    },"Invalid Email")

//table -> collections
const Employee = new mongoose.model("Employee",employeeSchema);
module.exports=Employee;