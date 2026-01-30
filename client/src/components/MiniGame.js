import React, {useState, useEffect, useRef} from 'react';

export default function MiniGame({onClose}){
  const [phase,setPhase] = useState('ready'); // ready -> waiting -> go -> result
  const [message,setMessage] = useState('Click to start the reaction test');
  const startRef = useRef(0);
  const timeoutRef = useRef(null);
  const [result,setResult] = useState(null);

  useEffect(()=>() => clearTimeout(timeoutRef.current),[]);

  function start(){
    setResult(null);
    setPhase('waiting');
    setMessage('Get ready...');
    const delay = 1000 + Math.random()*3000;
    timeoutRef.current = setTimeout(()=>{
      setPhase('go');
      setMessage('CLICK!');
      startRef.current = performance.now();
    }, delay);
  }

  function handleClick(){
    if(phase==='ready') start();
    else if(phase==='waiting'){
      // too early
      clearTimeout(timeoutRef.current);
      setPhase('ready');
      setMessage('Too soon — click to try again.');
    } else if(phase==='go'){
      const rt = performance.now() - startRef.current;
      setResult(rt.toFixed(0));
      setPhase('result');
      setMessage('Your reaction: ' + rt.toFixed(0) + ' ms');
    } else if(phase==='result'){
      // close or restart
      onClose();
    }
  }

  return (
    <div className="minigame-overlay" onClick={handleClick}>
      <div className="minigame-box">
        <h3>Reaction Time Test</h3>
        <p>{message}</p>
        {result && <p><strong>{result} ms</strong></p>}
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:8}}>
          <button onClick={(e)=>{e.stopPropagation(); start();}}>Start</button>
          <button onClick={(e)=>{e.stopPropagation(); onClose();}}>Close</button>
        </div>
        <p style={{fontSize:12,marginTop:8}}>Click anywhere in this box when it says CLICK!</p>
      </div>
    </div>
  );
}
