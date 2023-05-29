import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { PostProps } from "./PostCommon";
import { getComments } from "@/services";

const Comments: React.FC<Partial<PostProps>> = ({ slug }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {}, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <h1>Comments</h1>
    </div>
  );
};

export default Comments;
