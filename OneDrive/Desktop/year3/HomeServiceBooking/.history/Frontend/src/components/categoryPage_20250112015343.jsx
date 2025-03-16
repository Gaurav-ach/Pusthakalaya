import React from "react";
import { useParams } from "react-router-dom";
import categories from "../data/categories";

function CategoryPage() {
  const { categoryName } = useParams();
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName
  );

  if (!category) {
    return <h2 className="text-center text-xl font-bold">Category Not Found</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-center text-3xl font-bold mb-4">{category.name}</h2>
      <img
        src={category.image}
        alt={category.name}
        className="w-full max-w-3xl mx-auto rounded-md mb-4"
      />
      <p className="text-center text-lg">{category.description}</p>
    </div>
  );
}

export default CategoryPage;
