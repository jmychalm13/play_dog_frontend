/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export function BehaviorList({ behaviors }) {
  const displayBones = (rating) => {
    const validRating = Math.min(Math.max(rating, 1), 5);
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faBone}
        className={index < validRating ? "text-emerald-700" : "text-gray-200"}
      />
    ));
  };

  return (
    <div>
      {behaviors.map((behavior, index) => (
        <div key={index} className="mb-4 w-full">
          <div className="flex justify-between items-center border-b py-2">
            <div className="text-left">
              <h2 className="text-md">{behavior.behavior}</h2>
            </div>
            <div className="text-right">{displayBones(behavior.rating)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
