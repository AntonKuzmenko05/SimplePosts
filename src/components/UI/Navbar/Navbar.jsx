import React, { useContext } from 'react'
import '../../../styles/App.css'; // Оскільки ти маєш піднятись на 3 рівні вгору.
import { Link } from 'react-router-dom'
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logout = () =>{
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    
        <div className="navbar">
          <MyButton onClick={logout}>
            EXIT
          </MyButton>
        <div className="navbar__links">
          <Link to="/about">About site</Link>
          <Link to="/posts">Posts</Link>
        </div>
      </div>

  )
}

export default Navbar