import React, { useContext, useState, useEffect } from "react";
import Post from "../Post/Post";
// import Profile from "../Profile/Profile";
import { GlobalContext } from "../../Contexts/GlobalContext";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Home.scss";
function Home(props) {
  const { token, id, pending, setPending } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const posts = await axios.get("https://api-lb.herokuapp.com/api/posts", {
        method: "GET",
        data: { id },
        headers: { Authorization: token }
      });
      setPosts(posts);
      setPending(false);
    } catch (error) {
      if (error.reponse) {
        //? If there is internet connection
        const { code } = error.response.data.error;
        if (code === "AUTHORIZATION_REQUIRED") {
          props.history.push("/login");
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
    <div>
      {pending ? (
        <>
          <div className="loader">
            <Loader
              type="CradleLoader"
              color="#00BFFF"
              height="100"
              width="100"
            />
          </div>
        </>
      ) : (
        <Post
          firstName="Motaz"
          lastName="Abu Elnasr"
          text="Crestopher colombus is a good man"
        />
      )}
    </div>
  );
}

export default Home;
