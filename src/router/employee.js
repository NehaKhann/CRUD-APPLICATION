const express = require("express");

const router = new express.Router();
const Employee = require("../model/registration");
router.get("/", (req, res) => {
  res.render("add", { titlename: "Insert Employee" });
});

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("list", {
        list: docs,
      });
    }
  });
});
router.get("/:id",(req,res)=>{
  Employee.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.render("add",({
        titlename:"Update Employee",
        employee:doc
      }))
      console.log(doc);
    }
  })
})
router.get("/delete/:id",(req,res)=>{
  Employee.findByIdAndDelete(req.params.id,(err,doc)=>{
    if(!err){
      res.redirect("/list")
    }
    else{
      console.log("An error has occured while deleting the record", err);
    }
  })
})
router.post("/", (req, res) => {
  if(req.body._id==""){
    insertEmployee(req, res);
  }
  else{
    updateEmployee(req,res);
  }
 
});
const insertEmployee = async (req, res) => {
  try {
    var employee = await new Employee({
      Fullname: req.body.Fullname,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
      City: req.body.City,
    });
    if (
      employee.Fullname === "" ||
      employee.Email === "" ||
      employee.Mobile === "" ||
      employee.City === ""
    ){
        res.render("add",({
            titlename: "Insert Employee",
            error:"Enter all details",
            employee:req.body
        }))
        return;
    }
      await employee.save();
    res.redirect("/list");
  } catch (err) {

        if (err.name == 'ValidationError') {
           handleError(err,req.body)
           res.render("add",{
            titlename:"Insert Employee",
            employee:req.body
        })
        // console.log(req.body);
        }
    

  }
};
function handleError (err,body){
    for (field in err.errors) {
        switch(err.errors[field].path){
            case "Email":
                body["emailerror"]= err.errors[field].message
                break;
              
            default:
                break;
        }
       
     }
}
function updateEmployee(req,res){
const _id = req.body._id
  Employee.findByIdAndUpdate(_id,req.body,{
    new:true
  },(err,doc)=>{
    if(!err){
      res.redirect("/list")
    }
    else{
      if (err.name == 'ValidationError') {
        handleError(err,req.body)
        res.render("add",{
         titlename:"Update Employee",
         employee:req.body
     })
     }
     else{
       console.log("Error occured while updating the record",err);
     }
    }
  })
}
module.exports = router;
