import { useEffect, useState } from "react";
import axios from "axios";
function useFetch(url) {
    let [products,setProducts ] = useState([])
    let [error, setError] = useState("")
    let [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        let FetchApi = async () => {
            try {
                // let response = await fetch(url)  //returns promise
                let response = await axios.get(url)
            //     if (response.ok) {
            //         let data = await response.json()
            //         setProducts(data)
            //     }
            //     else {
            //         throw new Error("Data Not Found")
            //     }
                       
            setProducts(response.data);
            
            }
            catch (error) {
                setError(error.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        FetchApi()
    }, [])
    return {products,error,isloading,setProducts}
}

export default useFetch;