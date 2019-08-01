import React, { useContext, useState, useEffect } from "react";
import Post from "../Post/Post";
import { GlobalContext } from "../../Contexts/GlobalContext";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Home.scss";
function Home(props) {
  const { token, id } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [pending, setPending] = useState(true);
  const fetchPosts = async () => {
    try {
      const result = await axios.get("https://api-lb.herokuapp.com/api/posts", {
        method: "GET",
        data: { id },
        headers: { Authorization: token }
      });
      setPosts(result.data);
      setPending(false);
      console.log("Sdsds");
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
        <div className="loader">
          <Loader
            type="CradleLoader"
            color="#00BFFF"
            height="100"
            width="100"
          />
        </div>
      ) : (
        <>
          {posts.map(post => {
            const { firstName, lastName } = post.user;
            const { id, text } = post;
            return (
              <Post
                firstName={firstName}
                lastName={lastName}
                text={text}
                key={id}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Home;
