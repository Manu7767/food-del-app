const router = require("express").Router()
const RegC = require("../controllers/regControllers")
const FoodC = require("../controllers/foodController")


const multer = require("multer")

const Storage = multer.diskStorage({
destination :(req , file , cb)=>{
cb(null, "./public/upload"); 
},

filename : function(req,file,cb){
cb(null , Date.now()+file.originalname);

}
})


let upload = multer({

storage :Storage , 
limits :{
filesize : 1024*1024*4

}

})

router.post("/Register" , RegC.RegistrationUser)
router.post("/Login" , RegC.LoginUser)
router.post("/adminproductinsertform" ,upload.single("pimg") , FoodC.foodInsertform)
router.get("/adminshowdetails" ,FoodC.showFoodproducts )
router.delete("/admindeleteproduct/:id" , FoodC.DeleteFoodProduct) 
router.get("/singleproductupdate/:id" , FoodC.singleProductUpdate)


router.put("/adminupdateImage/:id", upload.single("pimg"),FoodC.adminfinalupdateImage)
router.put("/adminupdate/:id",FoodC.adminfinalupdate)
router.get("/usershowlist" , FoodC.usershowlist)
router.post("/cart" , FoodC.addtocart)
// router.post("/payment", FoodC.proceedtopaay);




module.exports = router