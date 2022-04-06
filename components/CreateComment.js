import axios from "axios";
import React, { useState } from "react";

export default function CreateComment(props) {
  const { pid, addComment, userName, userImage } = props;

  const [newComment, setNewComment] = useState({
    content: "",
    authorName: userName,
    authorImage: userImage,
  });

  const fSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/comment/${pid}`, { ...newComment }).then((res) => {
      addComment({ ...res.data });
    });
  };

  return (
    <>
      <div className="py-4">
        <div className="w-full border-t border-orange-500/50"></div>
      </div>
      <div className="flex space-x-4">
        <input
          type="text"
          value={newComment.content}
          onChange={(e) => {
            setNewComment({ ...newComment, content: e.target.value });
          }}
          className="bg-gray-200 grow p-2"
          placeholder="enter comment here..."
        ></input>
        <button
          onClick={fSubmit}
          className="hover:bg-orange-300 bg-orange-500 inline-block flex-none text-white font-bold text-lg px-2 rounded-full"
        >
          Comment
        </button>
      </div>
    </>
  );
}
