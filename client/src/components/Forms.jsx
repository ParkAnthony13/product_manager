import React,{useEffect, useState} from 'react'
import {Link} from '@reach/router'
import axios from "axios"


const Forms = props => {
    const{callToggle,setCallToggle}=props
    const [formState, setFormState] = useState({
        title:"",
        price:0,
        description:""
    })
    const [listState,setListState] = useState([])

    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/products",formState)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response.data)
                const {errors} = err.response.data
                for(let [key,value] of Object.entries(errors)){
                    console.log(key,value.message)
                }
            })
    }

    useEffect(() => {
        console.log("start")
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                setListState(res.data.allProducts)
                console.log(listState)
            })
            .catch(err => console.log(`Encountered Error: ${err}`))
    },[callToggle])

    return(
        <div>
            <div>
                <h1>Product Manager</h1>
                <form onSubmit={submitHandler}>
                    <p>
                        Title:
                        <input tpye="text" name="title" id="" onChange={changeHandler}/>
                    </p>
                    <p>
                        Price:
                        <input tpye="number" name="price" id="" onChange={changeHandler}/>
                    </p>
                    <p>
                        Description:
                        <textarea name="description" onChange={changeHandler}></textarea>
                    </p>
                    <input type="submit"/>
                </form>
            </div>
            <div>
                <h1>All Products</h1>
                {listState.map((product,idx) => {
                    return(
                        <div key={idx}>
                            {<Link to={`/product/${product._id}`}>{product.title}</Link>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Forms