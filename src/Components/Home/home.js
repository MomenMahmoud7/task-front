import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../Contexts/GlobalContext';
import Loader from 'react-loader-spinner';
import Post from '../Post/Post';
import './Home.scss';

const Home = props => {
  const { token, id } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [pending, setPending] = useState(true);

  const fetchPosts = async () => {
    try {
      const posts = await axios.get('https://api-lb.herokuapp.com/api/posts', {
        method: 'GET',
        data: { id },
        headers: { Authorization: token }
      });
      setPosts(posts);
      setPending(false);
    } catch (error) {
      if (error.reponse) {
        //? If there is internet connection
        const { code } = error.response.data.error;
        if (code === 'AUTHORIZATION_REQUIRED') {
          props.history.push('/login');
        } else {
          // TODO handle slow connection
        }
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {pending ? (
        <Loader type='Puff' color='#00BFFF' />
      ) : (
        <Post
          firstName='Motaz'
          lastName='Abu Elnasr'
          text='Crestopher Colombus is a good man'
        />
      )}
    </>
  );
};

export default Home;
