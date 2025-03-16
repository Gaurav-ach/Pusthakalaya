// PainterPage.js
import React from "react";

const PainterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Painter Services</h1>
      <p className="text-lg">Here you can find all painting-related services, such as interior and exterior painting, wall painting, and more!</p>
      {/* You can display a list of painting services, available painters, etc. */}
    </div>
  );
};

export default PainterPage;
