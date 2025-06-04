import React, { useEffect,useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
function Products() {

  
  return (
    <div>
      Products
      <Outlet />
  
    </div>

  )
}

export default Products