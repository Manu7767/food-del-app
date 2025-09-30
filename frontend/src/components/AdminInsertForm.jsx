
import React, { useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const AdminInsertForm = () => {

    const [pname, setPName] = useState("")
  const [pdesc, setDesc] = useState("")
  const [pamount, setPAmount] = useState("")
  const [pqty, setPQty] = useState("")
   const [pstatus, setPStatus] = useState("")
   const [pimg, setPImg] = useState("")

   const navigate = useNavigate()
    function handleinsertform(e){
      e.preventDefault()
       //console.log(pname , pamount , pdesc , pqty , pstatus)
      // console.log(pimg)
            let Data = new FormData()
            console.log(Data)
        
    Data.append("pname", pname)
    Data.append("pdesc", pdesc)
    Data.append("pamount", pamount)
    Data.append("pqty", pqty)
    Data.append("pstatus", pstatus)
    Data.append("pimg", pimg)

      fetch("http://localhost:5000/api/adminproductinsertform", {
      method: "POST",
      body: Data
    }).then((res)=>{return res.json()}).then((data)=>{
      console.log(data)
       if (data.status === 201) {
        
        toast.success(data.message)
        navigate("/show_allFood_details")


      } else {
      
        toast.error(data.message)
      }


    })
  }
   

  return (
    <div className='container mt-3' > 
    <div className ="row justify-content-md-center">
      <div className='col-md-8'>
       <p id="addfoodhere">ADD YOUR TASTY FOODS</p>
        <form  onSubmit={(e) => { handleinsertform(e) }}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form6Example1' label='FoodName' value={pname} onChange={(e) => { setPName(e.target.value) }} />
        </MDBCol>
   
      </MDBRow>

      <MDBInput wrapperClass='mb-4' id='form6Example3' label='FoodPrice' value={pamount} onChange={(e) => { setPAmount(e.target.value) }}  />
      <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='FoodQuantity' value={pqty} onChange={(e) => { setPQty(e.target.value) }} />
      <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='FoodDescription' value={pdesc} onChange={(e) => { setDesc(e.target.value) }} />
         <MDBInput id="form1" type="file" className="form-control mt-2 mb-4" onChange={(e) => { setPImg(e.target.files[0]) }} /> 
            
      <select className='form-select mt-2 mb-2' aria-placeholder = "Product Status" value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}} required id="stock" >
    
        <option value='OUT-STOCK'>status</option>
        <option value='OUT-STOCK'>out-stock</option>
        <option value= 'IN-STOCK'>in-stock</option>
       
        </select>

      <MDBBtn className='mb-4' type='submit' block id="food_insert_button">
        Place order
      </MDBBtn>
    </form>
      </div>
    </div>
       </div>
     
    
      

        

     

  )
}

export default AdminInsertForm