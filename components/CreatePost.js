import axios from "axios";
import React, { useState } from "react";

export default function CreatePost(props) {
  const { addPost } = props;

  const [newPost, setNewPost] = useState({
    name: "",
    content: "",
  });

  // add to database
  const fSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/posts", {
        ...newPost,
      })
      .then((res) => {
        addPost({
          ...newPost,
          id: res.data.id,
          comments: [],
        });
      });
  };

  return (
    <div className="mx-8 p-4 border-4 border-blue-500 rounded-lg">
      <h2 className="text-orange-500 font-bold text-2xl text-center underline">
        Create New Post
      </h2>
      <div className="mb-2">
        <label className="ml-2 block font-light text-orange-800">
          post name
        </label>
        <input
          onChange={(e) => {
            setNewPost({ ...newPost, name: e.target.value });
          }}
          value={newPost.name}
          type="text"
          className="bg-gray-200 p-2 w-full"
        ></input>
      </div>
      <div className="mb-2">
        <label className="ml-2 block font-light text-orange-800">
          post content
        </label>
        <textarea
          onChange={(e) => {
            setNewPost({ ...newPost, content: e.target.value });
          }}
          value={newPost.content}
          className="bg-gray-200 p-2 w-full"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          onClick={fSubmit}
          className="bg-orange-500 hover:bg-orange-300 text-white text-lg font-bold px-3 py-2 rounded-full"
        >
          Create
        </button>
      </div>
    </div>
  );
}
