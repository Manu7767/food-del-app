import React, { useContext, useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { contextapi } from '../Contextapi';

export default function UserDash() {

        const { cart, setCart, loginname } = useContext(contextapi);

  const [product, setProduct] = useState([]);
  const [message , setMessage] = useState("")
  useEffect(()=>{
         fetch("http://localhost:5000/api/usershowlist").then((res)=>{return res.json()}).then((data)=>{
          console.log(data)
             if (data.status === 200) {
                setProduct(data.apiData);
              } else {
                setMessage(data.message);
              }
         })
  } , [])

  //----------------------------------------------

   function handlecart(e, productid) {
    
        // Check if the user is logged in before adding the product to the cart
        if (!loginname) {
          // If the user is not logged in, show the login alert
          setShowLoginAlert(true);
          return;
        }
    
        let _cart = { ...cart };
        console.log(_cart)
    
        if (!_cart.items) {
          _cart.items = {};
          // console.log(_cart.items)
        }
    
        if (!_cart.items[productid]) {
          _cart.items[productid] = 1;
        } else {
          _cart.items[productid] += 1;
        }
    
        if (!_cart.totalitems) {
          _cart.totalitems = 1;
        } else {
          _cart.totalitems += 1;
        }
    
        setCart(_cart); // Update the cart context
        console.log(_cart);
         localStorage.setItem("cart",JSON.stringify(_cart));
       }


      //  const inputhandler = (e) => {
      //   setInputtext(e.target.value.toLowerCase());
      // };

    
  //----------------------------------------------


  return (

    <div className='container'>
      <div className='row'>
        {
          product.map((item, key)=>(
              <div className='col-md-4 mt-2'>
          <MDBCard>
            <MDBCardImage src={`http://localhost:5000/upload/${item.PImg}`} style={{ height: "20rem" }}  position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle id="title">{item.PName}</MDBCardTitle>
                     <MDBCardText id="price">
               <span><i class="bi bi-currency-dollar"></i></span> {item.PPrice}
              </MDBCardText>
              <MDBCardText id="desc">
                {item.PDesc}
              </MDBCardText>
           
           <MDBBtn href='#' onClick={(e) => handlecart(e, item._id)}>Add To Cart</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </div>
          ))
        }
        
      </div>
    </div>

  );
}