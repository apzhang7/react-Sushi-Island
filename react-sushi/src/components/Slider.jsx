import { useState } from "react";

export default function Slider({ items }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="slider-container flex flex-col border-2 border-white gap-4">
      <div className="slider overflow-hidden relative max-w-xs mx-auto">
        <div
          className="slides flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {items.map((item) => (
            <div className="slide min-w-full relative" key={item.name}>
              <img src={item.image} alt={item.name} className="w-full h-auto" />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-1 rounded">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={prevSlide}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
