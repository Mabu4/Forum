import React, { Fragment, useState } from "react";
import CreatePost from "./create-post";
import PostModel from "./post.model";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts((prevPosts) => {
      return [...prevPosts, post];
    });
  };

  return (
    <Fragment>
      <CreatePost addPost={addPost} />
      {posts.map((post) => (
        <PostModel key={post.id} post={post} />
      ))}
    </Fragment>
  );
};

export default Posts;
