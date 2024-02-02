import { useState, useEffect } from 'react';


 const usePlayerControls = () => {
  const keys:any = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', KeyR: "reload"};
  const moveFieldByKey = (key:any) => keys[key];

  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, reload: false});

  useEffect(() => {
    const handleKeyDown = (e:any) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e:any) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};

export default usePlayerControls