import React,{useEffect, useState} from 'react'
import axios from "axios"
import {Link,navigate} from "@reach/router"

const SingleProduct = props => {
    const[callToggle,setCallToggle] = useState(true)
    const[oneProduct,setOneProduct] = useState("")
    const{id} = props

    useEffect( () => {
        console.log("SP-start")
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data)
                setOneProduct(res.data)
            })
            .catch(err => console.log(`Encountered Error: ${err}`))
    },[callToggle])

    return(
        <div>
            {oneProduct 
            ? <div>
                <h3>{oneProduct.product.title}</h3>
                <p>Price: ${oneProduct.product.price}</p>
                <p>Description: {oneProduct.product.description}</p>
                <Link to={`/product/${id}/edit`}>Edit</Link>
            </div>
            : null}
        </div>
    )
}

export default SingleProduct