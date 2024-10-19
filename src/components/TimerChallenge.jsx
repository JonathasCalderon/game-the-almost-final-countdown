import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

  const timer = useRef();
  const dialog = useRef();

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

  const timeMilisecondsControl = 10;

  const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  if(remainingTime <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime(prevTimeRemaining => prevTimeRemaining - timeMilisecondsControl);
    }, timeMilisecondsControl);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal 
        ref={dialog} 
        targetTime={targetTime} 
        remainingTime={remainingTime} 
        handleReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running ...' : 'Timer Inactive'}
        </p>
      </section>
    </>
  )
}