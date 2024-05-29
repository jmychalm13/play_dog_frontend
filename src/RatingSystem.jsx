/* eslint-disable react/prop-types */
import { useState } from "react";

export function RatingSystem({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer transition-transform transform ${
              star <= (hover || rating) ? "text-emerald-800" : "text-gray-400"
            } ${hover === star ? "scale-125" : ""}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRatingChange(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
}
