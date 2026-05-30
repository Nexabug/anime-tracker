import React from "react";
import { Rank } from "./Rank";
function Rankings({ i }) {
  const adultRating = [
    "R - 17+ (Violence & Profanity)",
    "R+ - Mild Nudity",
    "Rx - Hentai",
  ];

  const teensRating = ["PG-13 - Teens 13 or older", "PG (Children)"];
  return (
    <div className="rankings">
      <Rank> Popularity: {i.popularity}</Rank>
      <Rank>Rank: {i.rank}</Rank>
      <Rank
        design={
          adultRating.some(
            (a) => a.toLowerCase() === String(i.rating).toLowerCase(),
          )
            ? "adults"
            : teensRating.some(
                  (a) => a.toLowerCase() === String(i.rating).toLowerCase(),
                )
              ? "teens"
              : "all"
        }
      >
        {i.rating}
      </Rank>
    </div>
  );
}

export default Rankings;
