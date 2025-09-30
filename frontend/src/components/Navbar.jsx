
// import React, { useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { contextapi } from '../Contextapi';


// const Navbar = () => {

//     const navigate = useNavigate();
//     const { loginname, setLoginName , cart   } = useContext(contextapi);
   
  
//     function handleLogout(e) {
//       e.preventDefault();
//       localStorage.removeItem("loginname");
//       setLoginName(null);
 
//       navigate("/Login"); // Redirect to login page after logout
//     }
//   return (
//     <div className="container-fluid" id="navbar">
//     <div className="row">
//       <div className="col-md-12">
//         <nav className="navbar navbar-expand-lg">
//           <div className="container-fluid">
//             <NavLink className="navbar-brand" to="/">
//         <span > <i class="bi bi-emoji-laughing-fill"></i></span>
//             </NavLink>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                 {loginname ? (
//                   <>
//                     <li className="nav-item">
//                       <NavLink className="nav-link" to="/">
//                         {loginname}
//                       </NavLink>
//                     </li>

                  
//                     <li className="nav-item dropdown">
//                       <a
//                         className="nav-link dropdown-toggle"
//                         href="#"
//                         id="navbarDropdown"
//                         role="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         Settings
//                       </a>
//                       <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id="drop">
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Action
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Another action
//                           </a>
//                         </li>
//                         <li>
//                           <hr className="dropdown-divider" />
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#" onClick={handleLogout}>
//                             Logout
//                           </a>
//                         </li>
//                       </ul>
//                     </li>

//                       {loginname !== "admin" (
//                       <li className="nav-item">
//                         <NavLink className="nav-link" to="/addtocartpage">
                 
//                           <span id="cartlogo">  <i className="bi bi-cart-dash-fill" ></i></span>
//                             <sup id="cartcount">{cart?.totalitems ?? 0}</sup>
                      
//                         </NavLink>
//                       </li>
//                     )}
//                   </>


//                 ) : (
//                   <li className="nav-item">
//                     <NavLink className="nav-link" to="/Login">
//                       Login
//                     </NavLink>
//                   </li>
//                 )}

                  
                  
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </div>
//   </div>

//   )
// }

// export default Navbar

//--------------------------------

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { contextapi } from "../Contextapi";

const Navbar = () => {
  const navigate = useNavigate();
  const { loginname, setLoginName, cart } = useContext(contextapi);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("loginname");
    setLoginName(null);
    navigate("/Login"); 
  }

  return (
    <div className="container-fluid shadow-sm sticky-top bg-light" id="navbar">
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              {/* Logo */}
              <NavLink className="navbar-brand fw-bold fs-4 text-primary" to="/">
                <i className="bi bi-emoji-laughing-fill"></i> MyFoodApp
              </NavLink>

              {/* Toggler for small screens */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                  {loginname ? (
                    <>
                      {/* Username */}
                      <li className="nav-item">
                        <NavLink
                          className="nav-link fw-semibold"
                          to="/"
                          style={({ isActive }) => ({
                            color: isActive ? "#0d6efd" : "#333",
                          })}
                        >
                          Hi, {loginname}
                        </NavLink>
                      </li>

                      {/* Settings dropdown */}
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle fw-semibold"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Settings
                        </a>
                        <ul
                          className="dropdown-menu shadow-sm"
                          aria-labelledby="navbarDropdown"
                          id="drop"
                        >
                          <li><button className="dropdown-item">Profile</button></li>
                          <li><button className="dropdown-item">Orders</button></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </li>

                    
                      {loginname.toLowerCase() !== "admin1" && (
                        <li className="nav-item ms-3">
                          <NavLink
                            className="nav-link position-relative"
                            to="/addtocartpage"
                          >
                            <i className="bi bi-cart-dash-fill fs-5"></i>
                            <span
                              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                              id="cartcount"
                            >
                              {cart?.totalitems ?? 0}
                            </span>
                          </NavLink>
                        </li>
                      )}
                    </>
                  ) : (
                    <li className="nav-item">
                      <NavLink className="nav-link fw-semibold" to="/Login">
                        Login
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
