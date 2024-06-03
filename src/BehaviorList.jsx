/* eslint-disable react/prop-types */
import { Behavior } from "./Behavior";

export function BehaviorList({ behaviors }) {
  return (
    <div>
      {behaviors.map((behavior, index) => (
        <Behavior key={index} behavior={behavior} />
      ))}
    </div>
  );
}
