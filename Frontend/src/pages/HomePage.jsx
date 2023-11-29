import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import Product from "../components/Product"
import { Link } from "react-router-dom"

const HomePage = () => {

    const [products, setProducts] = useState([])
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const filteredProducts = useMemo(() => {
        return products.filter(products => {
            return products.name.toLowerCase().includes(query.toLowerCase())
        })
    },[products, query])

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3001/api/products")
            setProducts(response.data)
            setIsLoading(false)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return(
        <div>
            <div className="flex">
                <Link to="/create" className="absolute inline-block mt-2 shadow-md bg-blue-500 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-400 hover:cursor-pointer">
                    Create A Product
                </Link>
                <div className="justify-center items-center mx-auto">
                    <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="w-72 mt-2 p-2 border border-gray-400 placeholder-slate-600 rounded shadow-sm focus:outline-none focus:shadow-md focus:border-blue-200 placeholder-gray-400" />
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {isLoading ? (
                    "Loading"
                ) : (
                    <>
                    {products.length > 0 ? (
                        <>
                            {filteredProducts.map((product)=>{
                                return(
                                    <Product key={product._id} product={product} getProducts={getProducts} />
                                )
                    })}
                        </>
                    ) : (
                        <div>
                            there is no product
                        </div>
                    ) }
                    </>
                )}
            </div>
        </div>
    )
}

export default HomePage