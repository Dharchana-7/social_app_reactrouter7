import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'
const Home = () => {
  const {posts,searchResults,fetchError,isLoading} = useContext(DataContext)
  return (
    //use this code
    // <main className='Home'>
    //   {posts.length ? (
    //     <Feed posts={posts} />
    //   ) : (
    //     <p style={{marginTop : "2rem"}}>
    //       No posts to display
    //     </p>
    //   )}
    // </main>

    //using custom hooks
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={searchResults}/> : <p className='statusMsg'>No posts to display</p>)}
    </main>
  )
}

export default Home
