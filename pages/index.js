import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  // auth
  const { user, error, isLoading } = useUser();

  // read data from DB
  const [posts, setPosts] = useState([]);

  // method to add posts to state
  const addPost = (post) => setPosts([...posts, post]);

  useEffect(() => {
    if (user) {
      // get from DB
      axios.get("/api/posts").then((res) => {
        setPosts([...res.data]);
      });
    }
  }, [user]);

  // check not loading or error
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex justify-center">
      <div className="lg:max-w-6xl min-w-4xl">
        <h1 className="my-2 text-center text-3xl font-bold text-orange-500">
          Basic Social Media
        </h1>
        {user ? (
          <>
            {posts.map((post, idx) => {
              return (
                <Post
                  post={post}
                  key={idx}
                  userName={user.name}
                  userImage={user.picture}
                />
              );
            })}
            <CreatePost addPost={addPost} />
            <div className="mt-4 flex justify-center items-center">
              {user.picture ? (
                <div className="mr-2 inline-block">
                  <Image
                    src={user.picture}
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
              <h3 className="mr-3 text-lg">{user.name}</h3>
              <Link href="/api/auth/logout">
                <a className="rounded-full bg-green-600 text-white px-4 py-2 hover:bg-green-300">
                  logout
                </a>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <Link href="/api/auth/login">
              <a className="rounded-full bg-green-600 text-white px-4 py-2 hover:bg-green-300">
                login or signup
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
