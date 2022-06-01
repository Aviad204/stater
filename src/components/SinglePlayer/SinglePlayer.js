import "./single-player.css";
import React from "react";

function SingelPlayer(props) {
  const { Xaxis, Yaxis, playerName, playerNumber, isGoaly } = props.player;
  let x;
  let y;

  // Handeling dimentions converter for keep input data real for the actual court dimentions : 105 by 68 metres
  const dimentionMultiplier = 7.5;
  if (Yaxis > parseInt(60)) {
    y = parseInt(60) * dimentionMultiplier;
  } else y = parseInt(Yaxis) * dimentionMultiplier;
  if (Xaxis > parseInt(100)) {
    x = parseInt(100) * dimentionMultiplier;
  } else x = parseInt(Xaxis) * dimentionMultiplier;

  let left = x + "px";
  let top = y + "px";

  return (
    <>
      {!isGoaly && (
        <ol className="container-player">
          <li
            style={{
              left: left,
              top: top,
              position: "absolute",
              zIndex: 20000,
              margin: 0,
              padding: 0,
            }}
          >
            <span className="number">{playerNumber}</span>
            <span className="name">{playerName}</span>
          </li>
        </ol>
      )}
      {isGoaly && (
        <ul id="goal" className="container-player">
          <li
            style={{
              left: left,
              top: top,
              position: "absolute",
              zIndex: 20000,
            }}
          >
            <span className="number">{playerNumber}</span>
            <span className="name">{playerName}</span>
          </li>
        </ul>
      )}
    </>
  );
}

export default SingelPlayer;
