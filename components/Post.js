import React, { useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

export default function Post(props) {
  const { post, userImage, userName } = props;

  const [comments, setComments] = useState(post.comments);

  const addComment = (comment) => setComments([...comments, comment]);

  console.log(post);

  return (
    <div className="mb-4 mx-8 p-4 border-4 border-orange-500 rounded-lg">
      <h1 className="underline font-bold text-xl pl-8 text-blue-600">
        {post.name}
      </h1>
      <p className="mt-2">{post.content}</p>
      {comments &&
        comments.map((comment, idx) => {
          return <Comment comment={comment} key={idx} />;
        })}
      <CreateComment
        addComment={addComment}
        pid={post.id}
        userImage={userImage}
        userName={userName}
      />
    </div>
  );
}
