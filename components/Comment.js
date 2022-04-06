import React from "react";
import Image from "next/image";

export default function Comment(props) {
  const { comment } = props;

  return (
    <>
      <div className="py-4">
        <div className="w-full border-t border-orange-500/50"></div>
      </div>
      <div className="flex items-center">
        {comment.authorImage ? (
          <div className="mr-2 inline-block">
            <Image
              src={comment.authorImage}
              width={40}
              height={40}
              alt="user profile"
            />
          </div>
        ) : (
          <svg
            className="inline-block w-10 h-10 text-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <h3 className="inline-block mx-2 italic text-orange-500 font-bold">
          {comment.authorName} Commented:
        </h3>
        <p className="inline-block">{comment.content}</p>
      </div>
    </>
  );
}
