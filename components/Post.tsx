import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="p-3 border-2 m-3 rounded-lg bg-white" onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <span className="border-b-2 text-3xl m-3">{post.title}</span>
      <div className="m-3">By {authorName}</div>
      <div className="m-3"> 
      <ReactMarkdown children={post.content} />
      </div>

    </div>
  );
};

export default Post;
