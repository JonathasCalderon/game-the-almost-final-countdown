import { useState, useRef } from "react";

export default function Player() {

  const playerInput = useRef();

  const [playerName, setPlayerName] = useState();

  function handleClick() {
    setPlayerName(playerInput.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input 
          ref={playerInput} 
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
