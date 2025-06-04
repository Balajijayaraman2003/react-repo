import React, { useState } from 'react'
import { Paper, TextField, Typography, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
let renderCount = 0

let schema = Yup.object().shape({
  name: Yup.string().required("Name is Required").matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/,"Enter Your Fullname"),
  email: Yup.string().email().required("Password is Required").matches(/^[a-z]+@[a-z]{3,5}.[a-z]{2,4}$/,"Enter Valied Email"),
  age: Yup.number().integer().positive().required("Enter Your Age").min(18,"Enter Age Between 18 to 30").max(30,"Enter Age Between 18 to 30"),
  password: Yup.string().required("Password is required"),
  cpassword: Yup.string().oneOf([Yup.ref("password"),null],"Password Is Must Match").required("Enter Confirm password")
  
})

function Signup() {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px",
  }
  let hello ={
    "name":"Balaji"
  }
  renderCount++;
  


  let { register, handleSubmit, formState: { errors } } = useForm({
    resolver:yupResolver(schema)
  })
  let handleData = (data) =>
  {

    
  }
  return (
    <div>
      <Paper elevation={20} style={paperStyle} component="form" onSubmit={handleSubmit(handleData)}>
        <Typography  textAlign="center" variant='h6'>Create Account - {renderCount}</Typography>
        <TextField  label="Name"
         {...register("name")} 
         helperText={errors.name?.message} // her ? mark is the chaining operator
         error ={!!errors.name}
         />
    
        <TextField label="email" {...register("email")}
          helperText={errors.email?.message}
          {...register("email")}
          error = {!!errors.email}
         />
        <TextField label="age" {...register("age")}
        helperText={errors.age?.message} // her ? mark is the chaining operator
        error ={!!errors.age} />
        <TextField label="password" {...register("password")}
        helperText={errors.password?.message} // her ? mark is the chaining operator
        error ={!!errors.password}/>
        <TextField label="Confirm Password" {...register("cpassword")}
        helperText={errors.cpassword?.message} // her ? mark is the chaining operator
        error ={!!errors.cpassword}/>
        <p><Button variant="contained" type="submit" fullWidth> SIGN UP</Button></p>
      </Paper>
    </div>
  )
}

export default Signup