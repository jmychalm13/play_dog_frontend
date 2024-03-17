/* eslint-disable react/prop-types */
import { useState } from "react";

export function BulletSelectList({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <ul className="list-disc pl-4">
      {options.map((option) => (
        <li
          key={option.id}
          className={`cursor-pointer ${selectedOption === option ? "text-blue-500" : ""}`}
          onClick={() => handleSelect(option)}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
}
