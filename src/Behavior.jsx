/* eslint-disable react/prop-types */

export function Behavior({ behavior }) {
  const stars = [];
  for (let i = 0; i < behavior.rating; i++) {
    stars.push(
      <span key={i} style={{ color: "gold" }}>
        &#9733;
      </span>
    );
  }

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="text-left">
        <p className="font-medium">{behavior.behavior}</p>
      </div>
      <div className="text-right">{stars}</div>
    </div>
  );
}
