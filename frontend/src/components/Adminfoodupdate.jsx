
import React, { useEffect, useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';



const Adminfoodupdate = () => {

     const {id }= useParams()
     const navigate = useNavigate()


    const [pname, setPName] = useState("")
  const [pdesc, setDesc] = useState("")
  const [pamount, setPAmount] = useState("")
  const [pqty, setPQty] = useState("")
   const [pstatus, setPStatus] = useState("")
   const [pimg, setPImg] = useState("")
     const [editImage , setEditImage] = useState(false);
     const [message , setMessage] = useState("")
   

   useEffect(()=>{
            fetch(`http://localhost:5000/api/singleproductupdate/${id}`).then((res)=>{return res.json()}).then((data)=>{
            console.log(data)

                if(data.status==200){
                setPName(data.apiData.PName)
                setDesc(data.apiData.PDesc)
                setPAmount(data.apiData.PPrice)
                setPQty(data.apiData.PQty)
                setPImg(data.apiData.PImg )
                setPStatus(data.apiData.PStatus)
              
            }else{
                setMessage(data.message)
    
             
            }
            
        
           })
   } , [])
   //-------------------------------------------------------------

   function handleupdateform(e){
      e.preventDefault()
      // console.log(pname , pamount ,pdesc , pqty,pstatus)
      // console.log(pimg)

          let Data1 = new FormData()

            if(editImage){
                Data1.append("pname", pname)
                Data1.append("pdesc", pdesc)
                Data1.append("pamount", pamount)
                Data1.append("pqty", pqty)
                Data1.append("pstatus", pstatus)
                  Data1.append("pimg", pimg);
                  fetch(`http://localhost:5000/api/adminupdateImage/${id}`,{
                    method : "PUT",
                    body : Data1
                }).then((res)=>{return res.json()}).then((data)=>{
                    console.log(data)
                    if(data.status===200){
                      setMessage(data.message)
                       navigate("/show_allFood_details")
                   }else{
                      setMessage(data.message)
                   }
                })
            }else{
              const data = {
                     pname: pname,
                     pdesc: pdesc,
                     pamount: pamount,
                     pqty: pqty,
                     pstatus: pstatus
                 }
                
//--------------------------------------------------------------------
                
             fetch(`http://localhost:5000/api/adminupdate/${id}`, {
                 method: "PUT",
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(data)
             })
         .then((res)=>{return res.json()}).then((data)=>{
             console.log(data)
          if(data.status===200){
             setMessage(data.message)
              navigate("/show_allFood_details")
          }else{
             setMessage(data.message)
          }
         })
         }
       }
      

  //--------------------------------------------------------------------
       
  return (
    <div className='container mt-3' > 
    <div className ="row justify-content-md-center">
      <div className='col-md-8'>
       <p id="addfoodhere">Update YOUR TASTY FOODS</p>
        <form  onSubmit={(e) => { handleupdateform(e) }}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form6Example1' label='FoodName' value={pname} onChange={(e) => { setPName(e.target.value) }} />
        </MDBCol>
   
      </MDBRow>

      <MDBInput wrapperClass='mb-4' id='form6Example3' label='FoodPrice' value={pamount} onChange={(e) => { setPAmount(e.target.value) }}  />
      <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='FoodQuantity' value={pqty} onChange={(e) => { setPQty(e.target.value) }} />
      <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='FoodDescription' value={pdesc} onChange={(e) => { setDesc(e.target.value) }} />
         {/* <MDBInput id="form1" type="file" className="form-control mt-2 mb-4" onChange={(e) => { setPImg(e.target.files[0]) }} />  */}
           
      <select className='form-select mt-2 mb-2' aria-placeholder = "Product Status" value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}} required id="stock" >
    
        <option value='OUT-STOCK'>status</option>
        <option value='OUT-STOCK'>out-stock</option>
        <option value= 'IN-STOCK'>in-stock</option>
       
        </select>

        {editImage ? <div>
              <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required />
            </div> : (
              <div>
                <img src={`http://localhost:5000/upload/${pimg}`} id="editImage" className='me-4 mt-2'  />
                <i  onClick={()=>{setEditImage(true)}}> Edit Image</i>
              </div>
            )}

      <MDBBtn className='mb-4' type='submit' block id="food_insert_button">
        update order
      </MDBBtn>
    </form>
      </div>
    </div>
       </div>
     
    
      

        

     

  )
}

export default Adminfoodupdate