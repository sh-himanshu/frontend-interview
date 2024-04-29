import { useState } from 'react';
import './App.css';
import { useCustomMemo } from './hooks/use-custom-memo';

const App = () => {
  const [num, setNum] = useState(10);
  const square = useCustomMemo(() => {
    for (let i = 0; i < 2000000000; i++) {}
    return num * num;
  }, [num]);

  return (
    <div>
      {[3, 5, 10, 13].map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setNum(item);
            console.log(square);
          }}
        >
          {item}
        </button>
      ))}

      <div>
        <span>SQUARE OF {num}: </span>
        <span>{square}</span>
      </div>
    </div>
  );
};

export default App;
