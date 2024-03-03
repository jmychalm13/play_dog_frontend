import { useHref } from "react-router-dom";

export function DogNew() {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1518640165980-d3e0e2aa6c1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gray-900/40"></div>
      <div className="z-10 relative w-1/2 flex items-center justify-center text-white ml-auto py-5">
        <h1 className="text-3xl font-bold mb-4">Add Pet</h1>
        <form action=""></form>
      </div>
    </div>
  );
}
