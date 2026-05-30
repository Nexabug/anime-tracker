import React from "react";

function Summary({ i }) {
  return (
    <div className="summary">
      <p>{i.synopsis}</p>
    </div>
  );
}

export default Summary;
