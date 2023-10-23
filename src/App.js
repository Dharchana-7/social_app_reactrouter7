import './App.css';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Post from './Post';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from './api/postslist';
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';

function App() {
  
  return (
    //width={width} ->custom hooks.logo vanthu header la fix panranala we are adding in header
    <DataProvider>
    <div className="App">
      <Header title="Dharshu Social Media" />
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Home posts={searchResults} />} /> */}
        <Route path="/" element={
          <Home />} 
        />
        <Route path="post">
            <Route index element={
              <NewPost />
            }/>
          
          <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path="/edit/:id" element ={<EditPost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
    </div>
    </DataProvider>
  );
}

export default App;
