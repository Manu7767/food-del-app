import React, { useEffect, useState } from 'react' ; 
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AllFoodlist = () => {

  const navigate = useNavigate()
    const [product, setProduct] = useState([])
    console.log(product)

   useEffect(() => {
    fetch("http://localhost:5000/api/adminshowdetails").then((res) => { return res.json() }).then((data) => {
      console.log(data)
      if (data.status === 200) {
        setProduct(data.apiData)
      } else {

      }
    })
  }, [])

  //----------------------------------------
    
  function handleremove(e, id){

    fetch(`http://localhost:5000/api/admindeleteproduct/${id}`,{
      method : "DELETE"
    }).then((res)=>{return res.json()}).then((data)=>{
      console.log(data)
       if(data.status === 200){
        toast.success(data.message)
  
        navigate('/show_allFood_details')
      }else{
        toast.error(data.message)
      }
    })
  
  }

  return (
    <div className='container'>
      <div className="row justify-content-md-center">
        <div className='col-md-2 mt-4' id="back_arrow">
          <Link to="/admindash"><span><i class="bi bi-arrow-left-square-fill"></i></span></Link>
        </div>
        <div className='col-md-10'>
          <table className="table  table-hover mt-3">
               <thead>
            <tr>
              <th> Food Image</th>
              <th>Food Name</th>
              <th style={{textAlign : "center"}}> Food Description</th>
              <th>Food Quantity</th>
              <th>Food Amount</th>
              <th>Food Status</th>
              <th> Food Update </th>
              <th> Food Delete </th>
            
           
            </tr>
          </thead>

          <tbody>

           
            {
              product.map((item , key)=>(
                  
                <tr key = {key}>
                   <img src={`http://localhost:5000/upload/${item.PImg}`} alt="img" id="myimg"  />

                  <td>{item.PName}</td>
                  <td>{item.PDesc}</td>
                  <td>{item.PQty}</td>
                 <td>{item.PPrice}</td>
                <td>{item.PStatus}</td>
                 <td><Link to={ `/adminproductupdate/${item._id}`}><button  className='btn btn-primary' ><i class="bi bi-pencil-fill"></i></button></Link></td> 
                 <td><Link to={`/adminproductremove/${item._id}`}>< span onClick={(e)=>{handleremove(e,item._id)}}><i class="bi bi-trash3-fill"></i></span></Link></td>
              
               
                </tr>

              ))
            }
          </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllFoodlist