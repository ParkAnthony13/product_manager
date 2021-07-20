import React,{useEffect, useState} from 'react'
import {Link, navigate} from '@reach/router'
import axios from "axios"

const EditProduct = props => {
    const[callToggle,setCallToggle] = useState(true)
    const[oneProduct,setOneProduct] = useState("")
    const[formState,setFormState] = useState({
        title:"",
        price:0,
        description:""
    })
    const{id} = props

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
        console.log(formState)
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/${id}`,{
            ...formState
        })
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => console.log(`Encountered Error: ${err}`))
    }

    const handleClick = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data)
                navigate("/")
            })
    }

    useEffect( () => {
        console.log("SP-start")
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data)
                setOneProduct(res.data)
            })
            .catch(err => console.log(`Encountered Error: ${err}`))
    },[])

    return(
        <div>
            {oneProduct 
            ? <div>
                <h3>Edit Product: {oneProduct.product.title}</h3>
                <form onSubmit={handleSubmit}>
                    <div style={{display:"flex",flexDirection:"column",width:"30%",margin:"auto",padding:"5px"}}>
                        <label>Title:</label>
                        <input type="text" onChange={handleChange} name="title" placeHolder={oneProduct.product.title} style={{textAlign:"center",height:"20px",margin:"5px"}}/>
                        <label>Price:</label>
                        <input type="number" name="price" onChange={handleChange} placeHolder={oneProduct.product.price} style={{textAlign:"center",height:"20px",margin:"5px"}}/>
                        <label>Title:</label>
                        <input type="text" name="description" onChange={handleChange} placeHolder={oneProduct.product.description} style={{textAlign:"center",height:"20px",margin:"5px"}}/>
                        <input type="submit" value="Edit"/>
                    </div>
                </form>
                <button onClick={handleClick}>Delete</button>
            </div>
            : null}
        </div>
    )
}

export default EditProduct