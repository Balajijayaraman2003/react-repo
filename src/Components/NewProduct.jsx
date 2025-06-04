import React, { useState } from 'react'
import { Paper, TextField, Typography, Grid, Button } from '@mui/material'

const NewProduct = () => {
    let paperStyle = {
        width: 400,
        margin: "20px auto",
        padding: "20px"
    }
    let [newProduct, setNewProduct] = useState(
        {
            "title": "",
            "price": 500,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating": {
                "rate": 0,
                "count": 0
            }
        })
    let handleChange = (event) => {
        let { name, value } = event.target
        let fieldName = name.split("rating.")[1]
        console.log(fieldName);
        if (name.includes("rating.")) {
            setNewProduct(
                {
                    ...newProduct,
                   rating:  {
                        ...newProduct.rating,

                        [fieldName]:value
                    }
                }
            )

        }
        else {
            setNewProduct({
                ...newProduct, [name]: value
            })
        }

    }
    let handleAdd=(e)=>{
       e.preventDefault()
       fetch("http://localhost:3000/products",{method:"POST",headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(newProduct)

       }).then(()=>{
        alert("Data Added successfully")
        setNewProduct(
            {
                "title": "",
                "price": 500,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                "rating": {
                    "rate": 0,
                    "count": 0
                }
            }
        )
       })
    }
    return (
        <Paper elevation={20} style={paperStyle}>
            <Typography variant='h5' textAlign="center">Create New Product</Typography>
            <Grid component="form" style={{ display: "grid", gap: "20px" }} onSubmit={handleAdd}>
                <TextField
                    value={newProduct.title}
                    name="title" label="Title"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    value={newProduct.category}
                    name="category"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange} />
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            value={newProduct.rating.rate}
                            name="rating.rate"
                            type="number"
                            label="Rate"
                            variant="outlined"
                            onChange={handleChange} />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            value={newProduct.rating.count}
                            name="rating.count"
                            type="number"
                            label="Count"
                            variant="outlined"
                            onChange={handleChange} />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" fullWidth>Add</Button>
            </Grid>
        </Paper>
    )
}

export default NewProduct