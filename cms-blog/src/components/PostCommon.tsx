export type PostProps = {
  title?: string;
  slug?: string;
  excerpt?: string;
  createdAt?: string;
  categories?: {
    slug: string;
    name: string;
  };
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
