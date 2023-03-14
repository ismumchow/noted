import React from "react"
import { GetStaticProps } from "next"
import prisma from "../lib/prisma"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1 className="text-5xl pb-5"> <span className="border-b-4 p-1 m-3  border-gray-600 border-width-3"> Feed </span></h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    
    </Layout>
  )
}

export default Blog
