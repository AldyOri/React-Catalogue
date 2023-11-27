import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

const Edit = () => {
    let { id } = useParams()
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name:"",
        description:"",
        price:"",
        quantity:"",
        category:{
            name:"",
            description:""
        },
        manufacturer:{
            name:"",
            description:""
        },
        image:""
    });

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/products/${id}`);
            setProduct({
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                quantity: response.data.quantity,
                category:{
                    name: response.data.category.name,
                    description: response.data.category.description
                },
                manufacturer:{
                    name: response.data.manufacturer.name,
                    description: response.data.manufacturer.description
                },
                image: response.data.image
            })
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await axios.put(`http://localhost:3001/api/products/${id}`, product);
            toast.success("Product updated");
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return(
        <div>
            <div className="max-w-2xl bg-white shadow-lg mx-auto p-7 rounded mt-6">
                <h2 className="font-semibold text-2xl block text-center">
                    Update a product
                </h2>
                {isLoading ? ("Loading") : (
                    <form onSubmit={updateProduct}>
                    <div className="flex gap-3">
                    <div className="space-y-2">
                        <div>
                            <label>Name</label>
                            <input type="text" value={product.name} onChange={(e)=>{setProduct({...product, name:e.target.value})}} placeholder="Enter name" className="w-72 block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div>
                            <label>Quantity</label>
                            <input type="number" value={product.quantity} onChange={(e)=>{setProduct({...product, quantity:e.target.value})}} placeholder="Enter quantity" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" value={product.price} onChange={(e)=>{setProduct({...product, price:e.target.value})}} placeholder="Enter price" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" value={product.description} onChange={(e)=>{setProduct({...product, description:e.target.value})}} placeholder="Enter a description (optional)" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input type="text" value={product.image} onChange={(e)=>{setProduct({...product, image:e.target.value})}} placeholder="Enter image url" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        </div>
    
                        <div className="">
                        <div>
                            <label>Category</label>
                            <input type="text" value={product.category.name} onChange={(e)=>{setProduct({...product, category:{...product.category, name:e.target.value}})}} placeholder="Enter product category" className="w-80 block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div className="mt-2">
                            <label>Category Description</label>
                            <input type="text" value={product.category.description} onChange={(e)=>{setProduct({...product, category:{...product.category, description:e.target.value}})}} placeholder="Enter category description (optional)" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div className="mt-2">
                            <label>Manufacturer</label>
                            <input type="text" value={product.manufacturer.name} onChange={(e)=>{setProduct({...product, manufacturer:{...product.manufacturer, name:e.target.value}})}} placeholder="Enter product manufacturer" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div className="mt-2">
                            <label>Manufacturer Description</label>
                            <input type="text" value={product.manufacturer.description} onChange={(e)=>{setProduct({...product, manufacturer:{...product.manufacturer, description:e.target.value}})}} placeholder="Enter manufacturer decription (optional)" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                        </div>
                        <div className="mt-9">
                            {!isLoading && (<button type="submit" className="block w-full mt-6 bg-blue-500 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-400">Save</button>)}
                            
                        </div>
                    </div>
                    </div>
                </form>
                )}
            </div>
        </div>
    )
}

export default Edit