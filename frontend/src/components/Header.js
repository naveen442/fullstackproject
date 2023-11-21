import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from '../features/auth/authSlice';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user} = useSelector(
    (state) => state.auth
  );
  const onlogout=()=>{
    localStorage.removeItem('user');
dispatch(logout());
navigate('/login');
  }
  return (
    <div className='header'>
     <div className='logo'>
<Link to="/">Goal setter</Link>
     </div>
     <ul>
        <li>
            <FaUser/>
            <Link to="/register">Register</Link>
            
        </li>
        {
          user?(
          <li>
            <button className='btn' onClick={onlogout}>
            <FaSignOutAlt/>
          Logout
            </button> 
      </li>):(
        <li>
        <FaSignInAlt/>
        <Link to="/login">Login</Link>
    </li>
      )
        }
      
     </ul>
    </div>
  )
}

export default Header
