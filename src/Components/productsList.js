import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const ProductList=()=>{
    const [product,setProduct]=useState([]);

    useEffect(()=>{
        getProduct();
    },[])
    const getProduct=async()=>{
        let result=await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result= await result.json();
        setProduct(result);
        console.log(result)

    }
    const deleteProduct=async(id)=>{
        let result= await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        if(result){
            alert("Record is Deleted")
            getProduct();
        }
    }
    const searchHandle=async (event)=>{
        let key=event.target.value;
        if(key){
            let result=await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result=await result.json();
            if(result){
                setProduct(result);
            }
        }
        else{
            getProduct();
        }

    }
    return(
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-product-box" type="text" placeholder="Search Product" onChange={searchHandle}>

            </input>
            <ul>
                <li>Sr No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
               product.length>0 ? product.map((item,index)=>
                <ul key={item._id}>
                    <li>{index +1 }</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>  
                    <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <Link to={"/update/"+item._id}>Update</Link>
                    </li> 
                </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;