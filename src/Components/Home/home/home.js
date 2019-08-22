import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../Contexts/GlobalContext';
import Post from '../post/post';
import axios from 'axios';
import './home.scss';
import AddPost from '../addPost/addPost';

const Home = props => {
  const { setPending, token, userId } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPending(true);
    const fetchPosts = async () => {
      try {
        const result = await axios.get(
          'https://api-lb.herokuapp.com/api/posts',
          {
            data: { userId },
            headers: { Authorization: token }
          }
        );
        setPosts(result.data);
        setPending(false);
      } catch (error) {
        setPending(false);
        props.history.push('/not-found');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='home-container'>
      <AddPost history={props.history} />
      <div>
        {posts.map(post => {
          const { firstName, lastName, username } = post.user;
          const { id, text } = post;
          return (
            <Post
              key={id}
              firstName={firstName}
              lastName={lastName}
              username={username}
              text={text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
