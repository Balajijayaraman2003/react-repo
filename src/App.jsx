import { createContext, useState } from "react";
import Content from "./Components/Content";
import Login from "./Components/Login";
import Products from "./Components/Products";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import "./App.css";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import NewProduct from "./Components/NewProduct";
import UpdateProduct from "./Components/UpdateProduct";
import WhishList from "./Components/WhishList";

function App() {
  let [user, setUser] = useState({
    name: "Balaji",
    age: 21,
    dob: "14/12/2003",
    gender: "Male",
  });
 if(!localStorage.getItem("cart"))
 {
  localStorage.setItem("cart",JSON.stringify([]))
 }
  let username = "Kesavan";

  return (
      <Router>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:user" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<Products />}>
          <Route index element={<ProductList/>} />
          <Route path="list" element={<ProductList />} />
            <Route path="details" element={<ProductDetails />} /></Route>
          <Route path="/todo" element={<Content />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/wishlist" element={<WhishList/>} />
        </Routes>
      </Router>
  );
}

export default App;