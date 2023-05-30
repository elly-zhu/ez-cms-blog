import React from "react";
import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "@/services";
import { PostProps } from "@/components/PostCommon";
import FeaturedPosts from "@/sections/FeaturePosts";

type PostConnection = {
  node: PostProps;
};

interface HomeProps {
  postconnections: PostConnection[];
}

const Home: React.FC<HomeProps> = ({ postconnections }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {postconnections.map((postconnection, index) => (
            <PostCard key={index} post={postconnection.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const postconnections = (await getPosts()) || [];
  return {
    props: { postconnections },
  };
}

export default Home;
