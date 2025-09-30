const Reg = require("../models/reg")
const bcrypt = require("bcrypt")

exports.RegistrationUser = async(req ,res)=>{
    const { username, password, email} = req.body
    const checkpass = await bcrypt.hash(password  , 10)
    const usercheck = await Reg.findOne({Username : username})
    console.log(usercheck)
    try{
        if(usercheck == null){
        const record =  new Reg({ Username: username, Password: checkpass, Email: email })
        console.log(record)
        record.save()
        res.json({
            status : 201 , 
            apiData : record , 
            message : "successfully Registered"
            
        })
    }else{
        res.json({
            status : 401 , 
            message : "username is already taken"
        })
    }
        
      }catch(error){
            res.json({
                status : 400 , 
                message : error.message
            })
      }
}

exports.LoginUser =async(req , res)=>{
    const {username , password} = req.body
    console.log(req.body)
    const record = await Reg.findOne({Username : username})
    console.log(record)
    try{
        if(record !== null){
             const userpasscheck = await bcrypt.compare( password ,  record.Password )
                console.log(userpasscheck)
                 if(userpasscheck){
     
                 
         res.json({
             status : 200 , 
             apiData : record.Username , 
             message  : `${username} successfully login`
         })
     }else{
         res.json({
             status : 400 , 
             message : 'oops somthing went wrong..'
     
        })
     }
        }else{
         res.json({
             status : 400 , 
             message : 'oops somthing went wrong..'
     
        })
        }
     }catch(error){
         res.json({
             status : 401 , 
             message : "wrong credientials"
         })
     }
}