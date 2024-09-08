import React from "react";

const SkeletonLoader = ({ type, width, height }) => {
  const classes = {
    thumbnail: `h-${height} bg-gray-700 rounded-md mb-2 w-full`,
    text: "h-4 bg-gray-600 rounded w-full mb-2", 
    title: "h-6 bg-gray-600 rounded w-3/4 mb-3",
    avatar: "rounded-full bg-gray-600 h-12 w-12 mb-4",
    button: "h-8 bg-gray-600 rounded mb-2 w-1/4",
  };

  return <div className={`animate-pulse ${classes[type]}`}></div>;
};

const SkeletonDisplayAll = ({
  direction,
  width,
  thumb_width,
  height,
  channelOwnerShow,
}) => {
  return (
    <div className="min-h-full w-full px-6 pt-0 pb-4">
      <div className={direction}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={`${width}`}>
            <div className="relative my-5 sm:my-0">
              <div
                className={`sm:p-4 rounded-xl transition-all duration-500 ${thumb_width}`}
              >
                <SkeletonLoader type="thumbnail" height={height} />

                <div className="flex">
                  {!channelOwnerShow && (
                    <div className="mr-2">
                      <SkeletonLoader type="avatar" />
                    </div>
                  )}
                  <div className="flex flex-col ml-2 w-full">
                    <SkeletonLoader type="title" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonDisplayAll;
