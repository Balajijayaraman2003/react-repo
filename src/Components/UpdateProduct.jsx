import React,{useEffect, useState} from 'react'
import { Paper,Typography,Grid,TextField,Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateProduct = () => {
    let Navigate = useNavigate()    
    let paperStyle = {
        width: 400,
        margin: "20px auto",
        padding: "20px"
    }
    let [updateProduct, setUpdateProduct] = useState(null)
        let {id} =useParams()
        useEffect(()=>{
            axios.get(`http://localhost:3000/products/${id}`)
            .then( res => setUpdateProduct(res.data))
        },[])
    
        let handleChange = (event) => {
        let { name, value } = event.target
        let fieldName = name.split("rating.")[1]
        console.log(fieldName);
                
        if (name.includes("rating.")) {
            setUpdateProduct(
                {
                    ...updateProduct,
                   rating:  {
                        ...updateProduct.rating,

                        [fieldName]:value
                    }
                }
            )

        }
        else {
            setUpdateProduct({
                ...updateProduct, [name]: value
            })
        }
    }
    
    let handleUpdate=(e)=>{
       e.preventDefault()
       fetch(`http://localhost:3000/products/${id}`,{method:"PUT",headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(updateProduct)

       }).then(()=>{
        alert("Data Updated successfully")
        Navigate("/product")
       }
       )
    }
    if(updateProduct !== null)
    {
        return (
            <Paper elevation={20} style={paperStyle}>
                <Typography variant='h5' textAlign="center">Create New Product</Typography>
                <Grid component="form" style={{ display: "grid", gap: "20px" }} onSubmit={handleUpdate}>
                    <TextField
                        value={updateProduct.title}
                        name="title" label="Title"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        value={updateProduct.category}
                        name="category"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange} />
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                value={updateProduct.rating.rate}
                                name="rating.rate"
                                type="number"
                                label="Rate"
                                variant="outlined"
                                onChange={handleChange} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                value={updateProduct.rating.count}
                                name="rating.count"
                                type="number"
                                label="Count"
                                variant="outlined"
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="success" fullWidth>Update Product</Button>
                </Grid>
            </Paper>
        )
    }
    else{
        return(
        <div>
            Loading...
        </div>
        )
    }
}

export default UpdateProduct