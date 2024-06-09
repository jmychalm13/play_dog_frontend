/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export function BehaviorList({ behaviors }) {
  const [bones, setBones] = useState([]);
  const behaviors_array = [];

  behaviors.map((behavior) => {
    behaviors_array.push(behavior.behavior);
  });

  console.log(behaviors);

  const displayBones = (rating) => {
    const validRating = Math.min(Math.max(rating, 1), 5);
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faBone}
        className={index < validRating ? "text-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <div>
      {behaviors.map((behavior, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold">{behavior.behavior}</h2>
          <div className="flex">{displayBones(behavior.rating)}</div>
        </div>
      ))}
    </div>
  );
}
