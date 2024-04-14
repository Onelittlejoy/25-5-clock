import './App.css';
import { useState, useEffect } from 'react';

const Break = (props) => {
  const {increment, decrement, length} = props;

  return (
    <div className='length'>
        <h2 id="break-label">Break Length</h2>
        <div className='setting'>
          <button id="break-increment" onClick={increment}><i className="fa fa-arrow-up fa-2x"></i></button>
          <h3 id="break-length">{length / 60}</h3>
          <button id="break-decrement" onClick={decrement}><i className="fa fa-arrow-down fa-2x"></i></button>
        </div>
    </div>
  )
}

const Focus = (props) => {
  const {increment, decrement, length} = props;

  return (
      <div className='length'>
        <h2 id="session-label">Session Length</h2>
        <div className='setting'>
          <button id="session-increment" onClick={increment}><i className="fa fa-arrow-up fa-2x"></i></button>
          <h3 id="session-length">{length / 60}</h3>
          <button id="session-decrement" onClick={decrement}><i className="fa fa-arrow-down fa-2x"></i></button>
        </div>
      </div>
  )
}

const Timer = (props) => {
  const {time, mode, active, clearTimer} = props;
  const minutes = Math.floor(time/1000/60);
  const seconds = Math.floor(time/1000%60);

  return (
    <div>
    <div className='clock'>
        
        <div id="timer-label"> {mode} </div>
        <div id="time-left">
          {minutes}:{seconds.toString().length === 1? "0" + seconds: seconds}
        </div>
        <div className='playandpause'>
          <button id="start_stop" onClick={active}>
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id='reset' onClick={clearTimer}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
        </div>
    </div>
    </div>
  )
}


const App = () => {
  const [breakLength, setBreakLength] = useState(5*60);
  const [sessionLength, setSessionLength] = useState(25*60);
  const [mode, setMode] = useState('session');
  const [timeLeft, setTimeLeft] = useState (25 * 60);
  const [isActive, setIsActive] = useState (false);
  const [timeSpent, setTimeSpent] = useState (0);

  useEffect(()=>{
    setTimeLeft(mode === "session"
      ? sessionLength * 1000
      : breakLength * 1000
    );
  },[sessionLength,breakLength]);

  useEffect(()=>{
    let interval = null;

    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode === 'session'
          ? sessionLength * 1000 - timeSpent
          : breakLength * 1000 - timeSpent
      );
      
      interval = setInterval(()=>{
        setTimeSpent((timeSpent)=>timeSpent+1000);
      },1000);
    } else {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      setTimeSpent(0);
      setMode((mode)=>(mode === "session"
        ? "break"
        : "session"
        ));
      setTimeLeft(mode === "session"
        ? sessionLength * 1000
        : breakLength * 1000
      );
      setIsActive(false);
    }
    return ()=>clearInterval(interval);
  },[isActive,timeSpent]);

  function reset() {
    setBreakLength(5*60);
    setSessionLength(25*60);
    setTimeLeft(mode==="session"
      ? sessionLength * 1000
      : breakLength * 1000
    );
    if (isActive){
      setIsActive(false);
      setTimeSpent(0);
    }
  }

  function toggleIsActive(){
    setIsActive(!isActive);
  }

  function decrementBreakLength () {
    const decreaseBreakLength = breakLength -60 > 60 ? breakLength - 60 : 60;
    setBreakLength(decreaseBreakLength);
  }

  function incrementBreakLength () {
    const increaseBreakLength = 
      breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60*60;
    setBreakLength(increaseBreakLength)
  }

  
  function decrementSessionLength () {
    const decreaseSessionLength = sessionLength -60 > 60 ? sessionLength - 60 : 60;
    setSessionLength(decreaseSessionLength);
  }

  function incrementSessionLength () {
    const increaseSessionLength = 
      sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60*60;
    setSessionLength(increaseSessionLength);
  }

  return (
    <div>
    <div className="App">
      <h1>25 + 5 Clock</h1>
      < Break 
        length = {breakLength}
        decrement = {decrementBreakLength}
        increment = {incrementBreakLength}
      />
      < Focus 
        length = {sessionLength}
        decrement = {decrementSessionLength}
        increment = {incrementSessionLength}
      />

      < Timer 
        time = {timeLeft} mode={mode}
        active = {toggleIsActive}
        clearTimer = {reset} 
      />
      </div>


      
      </div>
  );
}

export default App;
