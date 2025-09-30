const Food = require("../models/food") ; 
//  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");




exports.foodInsertform = (req ,res)=>{
    const { pname, pdesc, pqty, pstatus, pamount } = req.body
 
    const filename = req.file.filename
    try {
        const record = new Food({ PName: pname, PPrice: pamount, PDesc: pdesc, PQty: pqty, PStatus: pstatus, PImg: filename })
        record.save()

        res.json({
            status: 201,
            apiData: record,
            message: "your Product is successfully Stored"

        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}


exports.showFoodproducts = async(req , res)=>{
    try{
        const record = await Food.find()
        res.json({
            status : 200 , 
            apiData : record , 
            message : "Data is successfully Transfer on admin-DashBoard pls Check it ..."
    
        })
        }catch(error){
            res.json({
                status : 400 , 
                message : error.message
            })
        }
}

exports.DeleteFoodProduct = async(req , res)=>{
    const id = req.params.id
     try{
    await Food.findByIdAndDelete(id)
    res.json({
     status:200 , 
     message : "Successfully Remove Data"
    })
 }catch(error){
     res.json({
         status : 400 ,
         message : error.message
     })
 }
}

exports.singleProductUpdate = async(req ,res)=>{
      const id = req.params.id
         try{
             const record = await Food.findById(id)
             res.json({
                 status : 200 , 
                 apiData : record
             })
         }
         catch(error){
            res.json({
             status : 400 , 
             message : error.message
            })
         }
}


exports.adminfinalupdate =async(req , res)=>{
    const id = req.params.id
    



    const {pname , pdesc , pamount , pqty , pstatus} = req.body
    try{
        await Food.findByIdAndUpdate( id,
             {PName  : pname ,  PDesc : pdesc ,  PPrice : pamount , PQty : pqty ,  PStatus  : pstatus })
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
}
exports.adminfinalupdateImage =async (req ,res)=>{
    const id = req.params.id
    // console.log(id)
  
    const {pname , pdesc , pamount , pqty , pstatus} = req.body
  
     const filename = req.file.filename ; 
     
   
    try{
        if(req.file){
        await Food.findByIdAndUpdate( id ,{PName  : pname ,  PDesc : pdesc ,  PPrice : pamount , PQty : pqty ,  PStatus  : pstatus , PImg : filename })
        }else{
            await Food.findByIdAndUpdate( id, {PName  : pname ,  PDesc : pdesc ,  PPrice : pamount , PQty : pqty ,  PStatus  : pstatus })
       
        }
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
}

exports.usershowlist =async (req , res)=>{
    try{

        const record = await Food.find({ PStatus :"IN-STOCK"})
        console.log(record)
        res.json({
            status : 200 , 
            apiData : record , 
            message : "Represent successfully"

        })
    }catch(error){
        res.json({
            status : 400 , 
            message : error.message
        })
    }
}



exports.addtocart = async (req, res) => {
  try {
    const { ids } = req.body;   // ✅ ids ko req.body se lo
    console.log("Cart IDs:", ids);

    if (!ids || ids.length === 0) {
      return res.json({
        status: 400,
        message: "No product IDs provided",
      });
    }

    const rec = await Food.find({ _id: { $in: ids } });
    console.log("Cart Records:", rec);

    res.json({
      status: 200,
      apiData: rec,
    });
  } catch (error) {
    console.error("Cart fetch error:", error);
    res.json({
      status: 500,
      message: error.message,
    });
  }
};
// exports.proceedtopaay = async (req, res) => {
//   const { product, token } = req.body;
//   console.log("Product:", product);
//   console.log("Price:", product.price);

//   const idempotencyKey = uuidv4();

//   try {
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100, // cents me convert
//         currency: "usd",
//         customer: customer.id,
//         receipt_email: token.email, // 🔹 typo tha "recipt_email"
//         description: `Purchase of ${product.name}`, // product.name ko string me use karo
//         shipping: {
//           name: token.card.name,
//           address: {
//             country: token.card.address_country,
//           },
//         },
//       },
//       { idempotencyKey } // yaha bhi spelling sahi karo
//     );

//     return res.status(200).json(charge);
//   } catch (err) {
//     console.error("Payment Error:", err);
//     return res.status(500).json({ error: err.message });
//   }
// };