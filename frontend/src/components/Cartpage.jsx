

import React, { useContext, useEffect, useState } from 'react'
import { contextapi } from '../Contextapi'
// import StripeCheckout from 'react-stripe-checkout'  

const Cartpage = () => {
  const [prod, setProd] = useState([])
  const [message, setMessage] = useState("")
  const [wishlist, setWishlist] = useState([])
  const { cart, setCart } = useContext(contextapi)

 
  // const makePayment = (token) => {
  //   const body = {
  //     token,
  //     product: {
  //       name: "Cart Checkout",
  //       price: getTotalPrice(),   
  //       productBy: "My Shop"
  //     }
  //   }
  //   const headers = {
  //     "Content-Type": "application/json"
  //   }

  //   return fetch("http://localhost:5000/api/payment", {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(body)
  //   })
  //     .then((response) => {
  //       console.log("RESPONSE", response)
  //       const { status } = response
  //       console.log("STATUS", status)
  //     })
  //     .catch((error) => console.log(error))
  // }


  const getTotalPrice = () => {
    let total = 0
    if (prod.length > 0 && cart.items) {
      prod.forEach((item) => {
        const qty = cart.items[item._id] || 0
        total += item.PPrice * qty
      })
    }
    return total
  }

  useEffect(() => {
    if (cart && cart.items) {
      fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Object.keys(cart.items) }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setProd(data.apiData);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    } else {
      setMessage("Cart is empty or undefined");
    }
  }, [cart]);

  function handleQty(id) {
    return cart.items[id];
  }
  function handleinc(e, id) {
    let currentqty = handleQty(id);
    let _cart = { ...cart };
    _cart.items[id] = currentqty + 1;
    _cart.totalitems += 1;
    setCart(_cart);
  }
  function handledec(e, id) {
    let currentqty = handleQty(id);
    if (currentqty <= 1) return;
    let _cart = { ...cart };
    _cart.items[id] = currentqty - 1;
    _cart.totalitems -= 1;
    setCart(_cart);
  }
  function handleRemove(id) {
    let _cart = { ...cart };
    if (!_cart.items[id]) return;
    _cart.totalitems -= _cart.items[id];
    delete _cart.items[id];
    setCart(_cart);
    setProd(prod.filter((p) => p._id !== id));
  }
  function handleWishlist(item) {
    if (wishlist.some((w) => w._id === item._id)) {
      setWishlist(wishlist.filter((w) => w._id !== item._id));
    } else {
      setWishlist([...wishlist, item]);
    }
  }

  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0"> Cart Item : {prod.length} </h5>
                </div>
                <div className="card-body">
                  {prod.map((item) => (
                    <div className="row" key={item._id}>
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded">
                          <img
                            src={`http://localhost:5000/upload/${item.PImg}`}
                            className="w-100"
                            alt={item.PName}
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{item.PName}</strong></p>
                        <p>{item.PDesc}</p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          onClick={() => handleRemove(item._id)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm mb-2 ${wishlist.some((w) => w._id === item._id) ? "btn-success" : "btn-danger"}`}
                          onClick={() => handleWishlist(item)}
                        >
                          <i className="fas fa-heart" />
                        </button>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={(e) => handledec(e, item._id)}
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <div className="form-outline">
                            <input
                              type="number"
                              className="form-control"
                              value={handleQty(item._id)}
                              readOnly
                            />
                          </div>
                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={(e) => handleinc(e, item._id)}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr className="my-4" />
                </div>
              </div>

              {wishlist.length > 0 && (
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Wishlist</h5>
                  </div>
                  <div className="card-body">
                    {wishlist.map((item) => (
                      <p key={item._id}>❤️ {item.PName}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

        
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{cart.totalitems}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span><strong>${getTotalPrice()}</strong></span>
                    </li>
                  </ul>

                
                  {/* <StripeCheckout
                    stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
                    token={makePayment}
                    name="Cart Checkout"
                    amount={getTotalPrice() * 100}   
                  >
                    <button type="button" className="btn btn-primary btn-lg btn-block">
                      Pay Now
                    </button>
                  </StripeCheckout> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cartpage

