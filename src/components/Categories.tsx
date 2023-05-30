import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getCategories } from "@/services";

export type CategoryProps = {
  name?: string;
  slug?: string;
};

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useMemo(async () => {
    const newCategories = await getCategories();
    setCategories(newCategories);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pb-3 mb-3">
              {category.name}
            </span>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Categories;
