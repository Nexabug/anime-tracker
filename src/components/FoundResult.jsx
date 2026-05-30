import React from "react";

function FoundResult({ Lists }) {
  return (
    <div>
      <h4>
        Total Anime Found: <em>{Lists.length}</em>
      </h4>
    </div>
  );
}

export default FoundResult;
