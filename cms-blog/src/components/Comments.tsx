import React, { useState, useMemo } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { PostProps } from "./PostCommon";
import { getComments } from "@/services";

interface Comment {
  name: string;
  createdAt: string;
  comment: string;
}

const Comments: React.FC<Partial<PostProps>> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useMemo(() => {
    getComments(slug).then((result) => setComments(result));
  }, [slug]);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg pb-12 p-8 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-gray-100 mb-4 pb-4"
            >
              <p className="mb-4">
                <span className="font-semibold">
                  {comment.name} on{" "}
                  {moment(comment.createdAt).format("MMM DD, YYYY")}
                </span>
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
