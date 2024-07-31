import React from 'react'
import { Link } from 'react-router-dom'

const Cart = ({ cart, setCart }) => {

  const handleDelete = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
  }

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCart(updatedCart);
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + (Number(product.price) * product.quantity), 0);
  }

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return (
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {
          cart.length === 0 ? (
            <>
              <div className='text-center'>
                <h1>Your Cart is Empty</h1>
                <Link to={"/"} className='btn btn-warning'>Continue Shopping...</Link>
              </div>
            </>
          ) :
            cart.map((product) => {
              return (
                <div key={product.id} className="card mb-3 my-5" style={{ width: '700px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={product.imgSrc} className="img-fluid rounded-start" alt={product.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <button className="btn btn-primary mx-3">
                          {product.price} ₹
                        </button>
                        <button className="btn btn-warning">Buy Now</button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger mx-3">Delete</button>
                        <div className="mt-3">
                          <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
                          <input
                            id={`quantity-${product.id}`}
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                            style={{ width: "60px", marginLeft: "10px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>

      {
        cart.length !== 0 && (
          <div className="container text-center my-5">
            <h3>Total Price: {formatPrice(calculateTotalPrice())} ₹</h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button className='btn btn-warning mx-5 '>CheckOut</button>
              <button onClick={() => setCart([])} className='btn btn-danger'>Clear Cart</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Cart
