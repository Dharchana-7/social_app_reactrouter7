import {useState,useEffect} from 'react';

const useWindowSize = () =>{
    const [windowSize,setWindowSize] = useState({
        width:undefined,
        height:undefined
    });

    useEffect(()=>{
        const handleResize = () =>{
            setWindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            });
        }
        handleResize();
        //resize => function in javascript to handle width and height of our website
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize)
    },[])
    return windowSize;
}
export default useWindowSize;