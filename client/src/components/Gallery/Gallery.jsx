import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

if (typeof global === "undefined") {
  window.global = window;
}

export default function CakeGallery() {
  const [cakes, setCakes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // Explicitly assign category "flavour" and "design"
        const flavorCakes = (data["By Flavor"] || []).map((cake, idx) => ({
          id: cake.id || idx,
          name: cake.name || cake.title || "Untitled Cake",
          image: cake.image || cake.img || "",
          category: "flavour",
        }));

        const designCakes = (data["By Type/Design"] || []).map((cake, idx) => ({
          id: cake.id || idx + 10000, // make sure IDs don't clash
          name: cake.name || cake.title || "Untitled Cake",
          image: cake.image || cake.img || "",
          category: "design",
        }));

        setCakes([...flavorCakes, ...designCakes]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load data.json", err);
        setLoading(false);
      });
  }, []);

  // We use fixed filters here
  const filters = ["all", "flavour", "design"];

  const filteredCakes =
    selectedFilter === "all"
      ? cakes
      : cakes.filter((cake) => cake.category === selectedFilter);

  const images = filteredCakes.map((cake) => cake.image);

  if (loading) {
    return <p className="text-center py-10">Loading cakes...</p>;
  }

  if (!cakes.length) {
    return <p className="text-center py-10">No cakes available.</p>;
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-berryPink">Cake Gallery</h2>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-5 py-2 border-b-2 transition duration-200 ${
              selectedFilter === filter
                ? "border-orange-900 text-gray-900"
                : "border-transparent text-gray-700 hover:border-orange-400"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredCakes.map((cake, index) => (
          <div
            key={cake.id}
            className="relative overflow-hidden rounded-lg shadow group cursor-pointer"
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
          >
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 text-lg font-semibold">
              {cake.name}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          imageCaption={filteredCakes[photoIndex].name}
          enableZoom={true}
        />
      )}
    </div>
  );
}
