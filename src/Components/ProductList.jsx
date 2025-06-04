import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LifeLine } from 'react-loading-indicators'
import useFetch from './Custom-hook/useFetch';
import { FaCartPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { addItem, removeItem } from '../store/cartSlice'
const ProductList = () => {
  let Navigate = useNavigate()
  // let [products, setProducts] = useState([])
  // let [error, setError] = useState("")
  // let [isloading, setIsLoading] = useState(true)
  // useEffect(() => {
  //   fetch("http://localhost:3000/products", { method: "GET" })
  //     .then((response) => {
  //       if(response.ok)
  //       {
  //         return response.json()
  //       }
  //       else{
  //         throw new Error("Product Not Found")
  //       }
  //     })
  //     .then((data) => {
  //       setProducts(data)
  //     })
  //     .catch((error) => {
  //       setError(error.message)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })

  // }, [])

  let { isloading, products, error,setProducts } = useFetch("http://localhost:3000/products")

  let HandleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        console.log(response)
        setProducts(response.data)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      })
  }
  function ToNavigate() {
    Navigate("/newproduct")
  }


  let dispatch = useDispatch()
  let cartState = useSelector((state) => {
    return state.cart
  })
 


  function AddItemToCart(product) {

    let checkProduct = cartState.some( cartProduct => cartProduct.id == product.id )
    if(!checkProduct)
    {
      dispatch(addItem(product))
      Swal.fire({
        title: "Product Added To Cart",
        text: "Add Some Other Products For Purchase",
        icon: "success"
      });
    }
    else
    {
      Swal.fire({
        title: "Product Aldready Added To Cart",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }

    
  }
  if (isloading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LifeLine color="#32cd32" size="large" text="Loading..." textColor="" />
    </div>
  }
  else {
    return (
      <div>ProductList
        <section>
          <Button onClick={ToNavigate}>
            Add New Product <IoMdAdd />
          </Button>
        </section>
        {
          products.length !== 0 &&
          <section className="Products">
            {
              products.map((product) => {
                return (
                  <Card style={{ width: '18rem' }} className="Product" key={product.id}>
                    <center>
                      <Card.Img variant="top" src={product.image} style={{ width: '9rem', height: '12rem' }} />
                    </center>

                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text style={{ overflow: "scroll", height: "200px" }}>
                        ${product.price}
                        {product.description}
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>

                    </Card.Body>
                    <Card.Footer style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                      <Card.Text >
                        ${product.price}
                      </Card.Text>
                      <Button variant="primary" onClick={() => AddItemToCart(product)}><FaCartPlus /></Button>
                      <Button variant="secondary" onClick={() => {
                        Navigate(`/update/${product.id}`)
                      }}><FaEdit /></Button>
                      <Button variant="danger" onClick={() => HandleDelete(product.id)}><MdDelete /></Button>
                    </Card.Footer>
                  </Card>
                );
              })
            }
          </section>
        }
        {
          error && <p>{error}</p>
        }
      </div>
    )
  }
}

export default ProductList