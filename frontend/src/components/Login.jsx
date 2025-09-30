
import React, { useContext, useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { contextapi } from '../Contextapi';


const Login = () => {

  
    const [username, setUsername] = useState('');
    const [password  , setPassword] = useState('');

    const navigate = useNavigate()
    const {setLoginName} = useContext(contextapi)
   

    
    function handleLogin(e){
        e.preventDefault()
      
        const Logindata = {username , password}

          fetch("http://localhost:5000/api/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Logindata)
          }).then((res)=>{return res.json()}).then((data)=>{
            console.log(data)

              if(data.status === 200 ){
              localStorage.setItem("loginname" ,data.apiData )
              setLoginName(localStorage.getItem("loginname"))
              const adminUsers = ["admin1", "admin2", "admin3"];
             if (adminUsers.includes(data.apiData)){
                      navigate("/admindash")
                  }else{
                      navigate("/userdashboard")
                  }

              toast.success(data.message)
          
          }else{
           
              toast.error(data.message)
          }
         
          
          })

      

    }
  return (
    <div className=' container'>
      <div  className="row justify-content-md-center">
            <p id='login_heading'>Login</p>
         <div className='col-md-8'>
   <form onSubmit={(e)=>{handleLogin(e)}}>
      <MDBInput className='mb-4' type='Text' id='form2Example1' label='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href='#!'>Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' className='mb-4' block>
        Sign in
      </MDBBtn>

      <div className='text-center'>
        <p>
          Not a member? <Link to='/Register'>Register</Link>
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

export default Login