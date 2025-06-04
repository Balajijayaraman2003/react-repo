import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MdDelete } from "react-icons/md";
import { removeItem } from '../store/cartSlice';

//localStorage.setItem("cart",JSON.stringify([]))
// let item =JSON.parse(localStorage.getItem("cart"))
// localStorage.removeItem("cart")
// console.log(item)

const WhishList = () => {
    let cartProducts = useSelector((state)=>{
        console.log(state);
        
        return state.cart
    })
    console.log(cartProducts)

    let dispatch = useDispatch()
    let HandleDelete =(reduxItemId) =>
    {
        dispatch(removeItem(reduxItemId))
    }
  return (
    <div>
      <div>
        {
        cartProducts.length !==0 ?
        <section className="cartProducts">
          {
            cartProducts.map((cartProducts) => {
              return (
                <Card style={{ width: '18rem' }} className="cartProducts" key={cartProducts.id}>
                  <center>
                    <Card.Img variant="top" src={cartProducts.image} style={{ width: '9rem', height: '12rem' }} />
                  </center>

                  <Card.Body>
                    <Card.Title>{cartProducts.title}</Card.Title>
                    <Card.Text style={{ overflow: "scroll", height: "200px" }}>
                    ${cartProducts.price} 
                      {cartProducts.description}
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>

                  </Card.Body>
                  <Card.Footer style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    <Card.Text >
                      ${cartProducts.price}
                    </Card.Text>
                    <Button variant="danger" onClick={()=>HandleDelete(cartProducts.id)}><MdDelete /></Button>
                  </Card.Footer>
                </Card>
              );
            })
          }
        </section>
        : <h1>Please purchase something</h1>
        }
        
      </div>
    </div>
  )
}

export default WhishList