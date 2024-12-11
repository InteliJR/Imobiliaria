import React from "react";

type LoadingProps = {
  type: "skeleton" | "spinner";
};

const Loading: React.FC<LoadingProps> = ({ type }) => {
  if (type === "skeleton") {
    return (
      <div className="space-y-8 max-w-lg w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <div className="h-6 mb-2 bg-gray-300 rounded w-4/12 animate-pulse" />
            <div className="h-14 bg-gray-300 rounded w-full animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed left-0 bottom-0 flex justify-center items-center p-5">
      <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-[100%] animate-spin"></div>
    </div>
  );
};

export default Loading;
