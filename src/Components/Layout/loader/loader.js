import React, { useContext } from 'react';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import './loader.scss';

const Navbar = () => {
  const { pending } = useContext(GlobalContext);
  return pending ? (
    <div className='loader-bar'>
      <div className='loading' />
    </div>
  ) : null;
};
export default Navbar;
