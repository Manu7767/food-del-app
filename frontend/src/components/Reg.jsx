import React, { useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import toast, { Toaster } from "react-hot-toast";
 import { Link, useNavigate } from 'react-router-dom';

const Reg = () => {

        const [username, setUsername] = useState('');
    const [password  , setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate()

    function handlereg(e) {
    e.preventDefault();
    const formdata = { username, password, email };
    console.log(formdata);

    fetch("http://localhost:5000/api/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);

        if (data.status === 201) {
          toast.success(data.message || "Registration Successful!");
      
           navigate("/Login")
        } else {
          setMessage(data.message);
          toast.error(data.message || "Server Error!");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Something went wrong!");
      });
  }


  return (
    <div className='container' id="register_form">
        <div className="row justify-content-md-center">
          
            <div className='col-md-8'>
          <p id='reg_headin'>Registration</p>

        <form onSubmit={(e)=>{handlereg(e)}}>
      <MDBRow className='mb-4'>
     
        <MDBCol>
  <MDBInput label="Username" id="form1" type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' value={email} onChange={(e) => setEmail(e.target.value)}  />
      <MDBInput className='mb-4' type='password' id='form3Example4' label='Password'  value={password} onChange={(e) => setPassword(e.target.value)} />

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form3Example5'
        label='Subscribe to our newsletter'
        defaultChecked
      />

      <MDBBtn type='submit' className='mb-4' block>
        Sign in
      </MDBBtn>

      <div className='text-center'>
        <p>
          Not a member? <Link to='/Login'>Login</Link>
        </p>
        <p>or sign up with:</p>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='google' />
        </MDBBtn>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='twitter' />
        </MDBBtn>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='github' />
        </MDBBtn>
      </div>
    </form>

            </div>
        </div>
    </div>
  )
}

export default Reg