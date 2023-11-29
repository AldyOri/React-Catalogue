import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState({})
    const [manufacturer, setManufacturer] = useState({})
    
    const getProduct = async ()  => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://localhost:3001/api/products/${id}`)
            setProduct({...response.data, price: response.data.price.toLocaleString("id-ID", {style: "currency", currency: "IDR"})});
            setCategory(response.data.category);
            setManufacturer(response.data.manufacturer);
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }


    
    useEffect(() => {
        getProduct()
        //console.log(typeof(product.price))
    },[])

    return(
        <>
            {isLoading ? (<div>Loading...</div>) : ( 
            <div className="mt-36 mx-auto bg-white p-4 flex rounded-md shadow-md gap-4 max-w-4xl">
                <img src={product.image} className="w-72 h-72 object-cover rounded-md" />
                <div className="">
                    <div>{product.name}</div>
                    <div>{product.description}</div>
                    <div>Quantity : {product.quantity}</div>
                    <div>Price : {product.price}</div>
                    <br />
                    <div>Category : {category.name}</div>
                    <div>{category.description}</div>
                    <br />
                    <div>Manufacturer : {manufacturer.name}</div>
                    <div>{manufacturer.description}</div>
                </div>     
            </div>
            )}
        </>
    )
}

export default DetailPage;