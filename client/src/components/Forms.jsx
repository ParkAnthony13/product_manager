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
    const [errorList,setErrorList] = useState([])
    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        setCallToggle(!callToggle)
        axios.post("http://localhost:8000/api/products",formState)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response.data)
                const {errors} = err.response.data
                setErrorList(errors)
            })
    }

    const handleClick = (e,pID) => {
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/products/${pID}`)
            .then(res => {
                console.log(res.data)
                setCallToggle(!callToggle)
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
                    {errorList.title ? <p style={{color:"red"}}>{errorList.title.message}</p> : null}
                    <p>
                        Price:
                        <input tpye="number" name="price" id="" onChange={changeHandler}/>
                    </p>
                    {errorList.price ? <p style={{color:"red"}}>{errorList.price.message}</p> : null}
                    <p>
                        Description:
                        <textarea name="description" onChange={changeHandler}></textarea>
                    </p>
                    {errorList.description ? <p style={{color:"red"}}>{errorList.description.message}</p> : null}
                    <input type="submit"/>
                </form>
            </div>
            <div>
                <h1>All Products</h1>
                {listState.map((product,idx) => {
                    return(
                        <div key={idx}>
                            {<Link to={`/product/${product._id}`}>{product.title}</Link>}
                            <button onClick={(e) => {handleClick(e, product._id)}}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Forms