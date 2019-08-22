import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TiUser, TiChevronRight, TiFlash } from 'react-icons/ti';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import './navbar.scss';

const Navbar = () => {
  const { token, handleLogout } = useContext(GlobalContext);
  return (
    <>
      <nav className='navbar-container'>
        <div className='menu'>
          <div className='menu-item website-logo'>
            <TiFlash size='1.4em' />
            <Link to='/'>Flash</Link>
          </div>
          <div className='menu-item'>
            <Link to='/'>Home</Link>
          </div>
          <div className='menu-item'>
            <Link to='/'>Account</Link>
          </div>
        </div>
        <div className='menu menu-right'>
          <div className='menu-item dropdown-menu'>
            <TiUser size='28px' color='white' />
            {token ? (
              <div className='dropdown'>
                <div className='dropdown-item'>Account</div>
                <div className='dropdown-item' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            ) : (
              <div className='dropdown'>
                <div className='dropdown-body'>
                  <Link to='/login'>
                    <button>
                      <div className='button-action'>Log In</div>
                      <div className='button-label'>
                        <TiChevronRight size='1.4em' />
                      </div>
                    </button>
                  </Link>
                  <div>
                    New to Flash?
                    <br />
                    <Link to='/signup'>Create a new account</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className='loader-bar' />
    </>
  );
};
export default Navbar;
