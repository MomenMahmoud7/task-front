import React from 'react';
import { Link } from 'react-router-dom';
import { TiUser } from 'react-icons/ti';
import './navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className='navbar-left'>
        <Link to='/'>
          <span>Home</span>
        </Link>
      </div>
      <div className='navbar-right'>
        <Link>
          <TiUser size='28px' color='white' />
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
