const mongoose = require("mongoose") ; 

const regSchema = mongoose.Schema({

    Username : {type : String} , 

    Password : {type : String} , 

    Email : {type  : String }
})

module.exports = mongoose.model("reg" , regSchema)