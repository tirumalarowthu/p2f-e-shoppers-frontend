import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, deleteFromCart, getTotal } from '../Redux/cartSlice'
import HeaderOne from './HeaderOne'
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state) => state.cart.totalCartPrice)
  const totalQuantity = useSelector((state) => state.cart.totalCartQuantity)
  const dispatch = useDispatch()
  // console.log(totalPrice)
  // console.log(totalQuantity)
  // console.log(cartItems)
  useEffect(() => {
    dispatch(getTotal())
  }, [cartItems,dispatch])
  return (
    <React.Fragment>
      <HeaderOne />
      {
        totalQuantity > 0 ? <h1>Cart Items ({totalQuantity})</h1>:null
      }
      {
        cartItems.length > 0 ? <div> <table className='table '>
          <thead style={{ backgroundColor: "powderblue" }}>
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index, arr) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img width="30" height='30' alt={item.title} src={item.image} />{item.title}</td>
                <td>
                  <button onClick={() => dispatch(deleteFromCart(item))} className='p-1 m-1 btn btn-warning'>-</button>
                  {item.quantity}
                  <button onClick={() => dispatch(addToCart(item))} className='p-1 m-1 btn btn-primary'>+</button>
                </td>
                <td>{item.price}</td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            )
            }
          </tbody>
        </table>
          <div className='m-5' style={{ display: "flex", justifyContent: "space-between" }}>
            <div><Link to="/"><button className='btn btn-primary'> Continue To Shopping...</button></Link></div>
            <div><button className='btn btn-primary'>Grand Total-{totalPrice.toFixed(2)}</button></div>
          </div>
        </div>
          : <div className='text-center'>
            <img style={{width:"100%",height:"100%"}}  src="https://trenzo.co.in/public/images/empty-cart.png"/><br></br>
            <button style={{textDecoration:"none",fontWeight:"500"}} className='p-2 my-5 bg-warning '><Link to="/">Shopping Now </Link></button>
          </div>

      }
    </React.Fragment>
  )
}

export default Cart