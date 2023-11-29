import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const Product = ({product, getProducts}) => {

    //const [showDetail, setShowDetail] = useState(false);

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: "Do you really wanna delete the product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        })

        if(result.isConfirmed){
            try {
                await axios.delete(`http://localhost:3001/api/products/${id}`)
                toast.success("Product deleted")
                getProducts();
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return(
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <Link to={`/detail/${product._id}`}>
                <img src={product.image} className="w-full h-48 object-cover hover:scale-110 transition duration-500"></img>
            </Link>
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{product.name}</h2>
                <div className="text-sm">Quantity: {product.quantity}</div>
                <div className="text-sm">Price: {product.price.toLocaleString("id-ID", {style: "currency", currency: "IDR"})}</div>
            
                <div className="grid grid-cols-2 gap-2">
                    <div className="mt-2 flex gap-4">
                        <Link to={`/edit/${product._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">
                            Edit
                        </Link>
                    </div>
                    <div className="mt-2 flex gap-4">
                        <button onClick={()=>deleteProduct(product._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
    
}

export default Product