import React from "react";
import { getPosts, getPostDetails } from "@/services";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "@/components";
import { LoadingScreen } from "../../components";

const PostDetails = ({ data }) => {
  const router = useRouter();

  if (router.fallback) {
    return <LoadingScreen addClassName="h-full" />;
  }
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={data.post} />
          <Author author={data?.post?.author} />
          <CommentsForm slug={data?.post?.slug} />
          <Comments slug={data?.post?.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={data?.post?.slug}
              categories={data?.post?.categories.map(
                (category) => category.slug
              )}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { data: data },
  };
}
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}