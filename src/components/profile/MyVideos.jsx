import React from "react";
import Display from "../video/Display";

export default function MyVideos({ auth, id }) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 w-full h-full rounded-lg p-4">
        <Display auth={auth} id={id} />
      </div>
    </div>
  );
}
