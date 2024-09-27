import React, { useContext } from 'react'
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from '../pages/Error';
import Login from '../pages/Login';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PostID from '../pages/PostID';
import { publicRoutes,privateRoutes } from '../routes';
import { AuthContext } from '../context';
// import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext); // isLoading

  // if(isLoading){
  //   return <Loader/>
  // }

  return (
    isAuth
      ?
      <Routes>
    {privateRoutes.map(route =>
      <Route 
      exact={route.exact}
      path={route.path}
      element={route.element}
        key={route.path}
    />
    )}
     </Routes>
      : 
    <Routes>
    {publicRoutes.map(route =>
      <Route 
      exact={route.exact}
      path={route.path}
      element={route.element}
      key={route.path}
    />
    )}
    <Route path="*" element={<Login />}/> // Works well but not very well (after EXIT working nice)
  </Routes>
  )
}

export default AppRouter