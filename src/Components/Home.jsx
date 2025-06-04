import React from 'react'
import useFetch from './Custom-hook/useFetch'


function Home() {
  let{products} = useFetch("http://localhost:3000/products")
  return (
    <div>
        <h1>Home Page </h1>
        <h3>Total products = {products.length} </h3>

    </div>
  )
}

export default Home