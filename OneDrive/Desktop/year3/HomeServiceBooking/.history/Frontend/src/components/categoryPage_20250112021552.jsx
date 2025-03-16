import React from "react";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const categories = [
    { name: "Plumber", icon: "🔧" },
    { name: "Electrician", icon: "💡" },
    { name: "Cleaner", icon: "🧹" },
    { name: "Painter", icon: "🎨" },
    { name: "Shifting", icon: "🚚" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Services</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link
            to={`/category/${category.name.toLowerCase()}`}
            key={index}
            className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-4xl">{category.icon}</div>
            <h2 className="text-lg font-semibold mt-2">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
