import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Admindash = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-4' id="adminParentsidebar">
        <Link to="/Admin_add_Foods"> <span style={{color : "white"}}>Add Foods Here</span></Link>   
        </div>
           <div className='col-md-4 ms-5' id="adminParentsidebar_one">
        <Link to="/show_allFood_details"> <span style={{color : "white"}}> All Foods Details </span></Link>  
           </div>
      </div>
    </div>
  )
}

export default Admindash