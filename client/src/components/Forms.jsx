import React,{useState} from 'react'
import axios from "axios"


const Forms = props => {
    const [formState, setFormState] = useState({
        title:"",
        price:0,
        description:""
    })

    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/products",formState)
            .then(res => console.log(res))
            .catch(err => {
                console.log(err.response.data)
                const {errors} = err.response.data
                for(let [key,value] of Object.entries(errors)){
                    console.log(key,value.message)
                }
            })
    }

    return(
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
    )
}

export default Forms