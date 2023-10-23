import {useState,useEffect} from 'react'
import axios from 'axios';

const useAxiosFetch = (dataUrl) =>{
    const [data,setData] = useState([]);
    const [fetchError,setFetchError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect (()=>{
        // isMounted -> api mount ayiduchana check panraku
        let isMounted = true;
        //axios properties -> CancelToken
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try{
                const response = await axios.get(url,{
                    CancelToken: source.token
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            } finally{
                isMounted && setTimeout(()=>
                setIsLoading(false),2000);
            }
        }
        fetchData(dataUrl);
        const CleanUp = () =>{
            isMounted = false;
            source.cancel();
        }
        return CleanUp;
    },[dataUrl]);
    return {data, fetchError, isLoading}
}
export default useAxiosFetch;