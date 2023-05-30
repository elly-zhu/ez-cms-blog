import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getCategories } from "@/services";
import { Category } from "./PostCommon";

const Header: React.FC = () => {
  const headers = [
    { title: "About Me", url: "about-me" },
    { title: "Blog", url: "" },
  ];

  const [categories, setCategories] = useState<Category[]>([]);

  useMemo(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
