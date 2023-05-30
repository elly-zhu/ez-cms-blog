export interface Post {
  post: PostProps;
}

export type Category = {
  slug: string;
  name: string;
};

export type PostProps = {
  title?: string;
  slug?: string;
  excerpt?: string;
  createdAt?: string;
  categories?: Category[];
  featuredImage?: {
    url: string;
  };
  author?: {
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
  content?: {
    raw: any;
  };
};
