/* eslint-disable react/prop-types */

export function BehaviorList({ behaviors }) {
  const stars = [];
  const behaviors_array = [];
  behaviors.map((behavior) => {
    for (let i = 0; i < behavior.rating; i++) {
      stars.push(<span style={{ color: "gold" }}>&#9733;</span>);
    }
  });

  behaviors.map((behavior) => {
    behaviors_array.push(behavior.behavior);
  });

  return (
    <div>
      {behaviors_array.map((behavior, index) => (
        <div key={index}>
          <p>{behavior}</p>
          <div className="stars"></div>
        </div>
      ))}
    </div>
  );
}
