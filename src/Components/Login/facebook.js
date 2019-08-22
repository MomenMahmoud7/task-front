import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { SignupContext } from '../../Contexts/SignupContext';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import './facebook.scss';

const Facebook = () => {
  const { handleSignup } = useContext(SignupContext);
  const responseFacebook = response => {
    console.log(response);
    const name = response.name.split(' ', 2);
    const firstName = name[0];
    const lastName = name[1];
    // handleSignup(
    //   firstName,
    //   lastName
    //   //   username,
    //   //   phoneNumber,
    //   //   password,
    //   //   confirmPassword,
    //   //   email,
    //   //   setErrors
    // );
  };
  return (
    <FacebookLogin
      appId='714341152320688'
      autoLoad={false}
      fields='name,email,picture'
      callback={responseFacebook}
      cssClass='facebook-button'
      icon={<TiSocialFacebookCircular />}
    />
  );
};

export default Facebook;
