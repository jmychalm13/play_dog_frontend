import { useHref } from "react-router-dom";

export function DogNew() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
      style={{
        backgroundImage: useHref(
          "https://images.unsplash.com/photo-1518640165980-d3e0e2aa6c1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ),
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
    </div>
  );
}
