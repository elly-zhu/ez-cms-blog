import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const headers = [
    { title: "About Me", url: "about-me" },
    { title: "Blog", url: "" },
  ];
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
          {headers.map((header) => (
            <Link key={header.url} href={`/${header.url}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {header.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
