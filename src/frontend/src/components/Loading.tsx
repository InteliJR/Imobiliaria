import React from "react";

type LoadingProps = {
  type: "skeleton" | "spinner" | "box";
  boxWidth?: number;
  boxHeight?: number;
  skeletonQtd?: number;
};

const Loading: React.FC<LoadingProps> = ({ type, boxWidth, boxHeight, skeletonQtd = 5 }) => {
  if (type === "skeleton") {
    return (
      <div className="space-y-8 w-full">
        {Array.from({ length: skeletonQtd }).map((_, index) => (
          <div key={index}>
            <div className="h-6 mb-2 bg-gray-300 rounded w-4/12 animate-pulse" />
            <div className="h-14 bg-gray-300 rounded w-full animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "box") {
    return (
      <div
        className="bg-gray-300 rounded animate-pulse"
        style={{
          width: boxWidth ? `${boxWidth}px` : "100%",
          height: boxHeight ? `${boxHeight}px` : "100%",
        }}
      />
    );
  }

  return (
    <div className="fixed left-0 bottom-0 flex justify-center items-center p-5 z-40 ">
      <div className="h-9 w-9 border-8 border-blue-500 border-t-transparent rounded-[100%] shadow-lg animate-spin"></div>
    </div>
  );
};

export default Loading;
