import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState({
        name: "",
        description: ""
    });
    const [manufacturer, setManufacturer] = useState({
        name: "",
        description: ""
    });
    const [image, setImage] = useState("https://placehold.co/300");
    
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        if(name === "" || quantity === "" || price === "" || category === "" || manufacturer ===""){
            toast.warning("Please fill all the field");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:3001/api/products", {name: name, quantity: quantity, price: price, image: image, category:category, manufacturer:manufacturer})
            toast.success(`${response.data.name} saved`)
            setIsLoading(false);
            navigate("/")
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return(
        <div className="max-w-2xl bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="mb-4 font-semibold text-2xl block text-center">
                Create a product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="flex gap-3">
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter name" className="w-72 block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} placeholder="Enter quantity" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}} placeholder="Enter price" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="Enter a description (optional)" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => {setImage(e.target.value)}} placeholder="Enter image url" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    </div>

                    <div className="">
                    <div>
                        <label>Category</label>
                        <input type="text" value={category.name} onChange={(e) => {setCategory({...category, name: e.target.value})}} placeholder="Enter product category" className="w-80 block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div className="mt-2">
                        <label>Category Description</label>
                        <input type="text" value={category.description} onChange={(e) => {setCategory({...category, description: e.target.value})}} placeholder="Enter category description (optional)" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div className="mt-2">
                        <label>Manufacturer</label>
                        <input type="text" value={manufacturer.name} onChange={(e) => {setManufacturer({...manufacturer, name: e.target.value})}} placeholder="Enter product manufacturer" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div className="mt-2">
                        <label>Manufacturer Description</label>
                        <input type="text" value={manufacturer.description} onChange={(e) => {setManufacturer({...manufacturer, description: e.target.value})}} placeholder="Enter manufacturer decription (optional)" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div className="mt-9">
                        {!isLoading && (<button type="submit" className="block w-full mt-6 bg-blue-500 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-400">Save</button>)}
                        
                    </div>
                </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePage