import { request, gql } from "graphql-request";
import pThrottle from "p-throttle";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const throttle = pThrottle({ limit: 3, interval: 1000 });

export const throttledFetch = throttle(async (...args) => {
  const [graphqlAPI, query, vars] = args;

  const data = await request(graphqlAPI, query, vars);

  return data;
});

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            excerpt
            title
            slug
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
            content {
              raw
            }
          }
        }
      }
    }
  `;

  const result = await throttledFetch(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        excerpt
        title
        slug
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await throttledFetch(graphqlAPI, query, { slug });

  return result;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last:3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await throttledFetch(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await throttledFetch(graphqlAPI, query, { categories, slug });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories(){
      categories {
        name
        slug
      }
    }
  `;

  const result = await throttledFetch(graphqlAPI, query);

  return result.categories;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await throttledFetch(graphqlAPI, query, { slug });

  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await throttledFetch(graphqlAPI, query);

  return result.posts;
};
