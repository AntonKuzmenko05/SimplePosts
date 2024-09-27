/*Надо будет сделать что бы поиск не был только на 1 страничккее
  проблема с удалением и добовлнием то что оно не остаеться
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
// import Counter from "./components/Counter";
import '../src/styles/App.css'
// import PostItem from "./components/PostItem";
// import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
// import MyInput from "./components/UI/input/MyInput";
// import PostForm from "./components/PostForm";
// import MySelect from "./components/UI/select/MySelect";
// import PostFilter from "./components/PostFilter";
// import MyModal from "./components/UI/MyModal/MyModal";
// import { usePosts } from "./hooks/usePosts";
// import axios from "axios";
// import PostService from "./API/PostService";
// import Loader from "./components/UI/Loader/Loader";
// import { useFetching } from "./hooks/useFetching";
// import { getPageCount, getPagesArray } from "./utils/pages";
// import Pagination from "./components/pagination/Pagination";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';


function App() {
  const [isAuth,setIsAuth] = useState(false);

  //const [isLoading,setLoading] = useState(true);

  useEffect(()=>{
      if(localStorage.getItem('auth')){
        setIsAuth(true);
      }
      // else{
      //   setIsAuth(false)
      // }
      //setLoading(false);
  },[])

  return(
   
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        // isLoading
    }}>
    <BrowserRouter>
      <Navbar/> 
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
