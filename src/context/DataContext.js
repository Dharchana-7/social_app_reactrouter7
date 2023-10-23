import { createContext ,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { format } from "date-fns";
import api from '../api/postslist'
const DataContext = createContext({})

//DataProvider -> Yenthentha components ku value and data send pananum kaga using this
//value -> yenna yenna values send panromnu katraku value use panrom
export const DataProvider = ({children}) =>{
    const[posts,setPosts] = useState([])
  const[search,setSearch] = useState('')
  //search panra values uh show panraku below state and usually it will be in form of an array
  const[searchResults,setSearchResults] = useState([])
  const[postTitle,setPostTitle] = useState('')
  const[postBody,setPostBody] = useState('')
  const[editTitle,setEditTitle] = useState('')
  const[editBody,setEditBody] = useState('')
  const navigate = useNavigate()
// custom hooks - refer hooks folder
  const {width} = useWindowSize()

 // using custom hook
  const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');
  useEffect(()=>{
    setPosts(data);
  },[data])

  // Before using hooks we used the below code
  // useEffect(()=>{
  //   const fetchPosts = async() =>{
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (err) {
  //       if(err.response){
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else{
  //         console.log(`Error:${err.message}`)
  //       }
  //     }
  //   }
  //   fetchPosts();
  // }, [])  


  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      ||((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(),'MMMM dd, yyyy pp')
    const newPost = {id , title: postTitle , datetime, body: postBody}
      try{
      // api la poitu namma new post create panathuku aprm update panraku
      const response = await api.post('/posts', newPost)
      //api use panraku munnadi(dummy data used this)-> const allPosts = [...posts,newPost];
      const allPosts = [...posts,response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/')
      }catch (err) {
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else{
          console.log(`Error:${err.message}`)
        }
      }
  }
  const handleEdit = async (id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, title:editTitle, datetime, body:editBody}
    try{
      //yetho onnu matum edit panna update/yella datas um irukanala put use panrom
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map((post)=>post.id === id ? {... response.data}: post));
      setEditTitle('');
      setEditBody('');
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }
  const handleDelete = async (id) =>{
    try{
      await api.delete(`posts/${id}`)
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigate('/')
  }catch(err) {
    console.log(`Error : ${err.message}`)
  }
  }
    return (
        <DataContext.Provider value={{
            width,search,setSearch,
            searchResults,fetchError,isLoading,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,
            posts,handleDelete,handleEdit,editTitle,setEditTitle,editBody,setEditBody
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;