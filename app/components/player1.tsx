import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
interface PlayerProps {
  points: number;
  chooseplayer:string;
  
}

const PlayerOne: React.FC<PlayerProps> = ({ points ,chooseplayer  }) => {
  const [input, setInput] = useState(true);
  const [inputValue, setInputValue] = useState('Player1');
  const inputRef = useRef<HTMLInputElement>(null);

  const ShowInput = () => {
    setInput(!input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setInputValue(values);
  };

  useEffect(() => {
    if (!input && inputRef.current) {
      inputRef.current.focus();
    }
  }, [input]);

  return (
    <div className={`absolute left-0 top-0  p-5 w-52 rounded-br-md gap-1 flex-col flex border-b-white border-r-white border-r-2 border-b-2 ${chooseplayer=='p1'? 'bg-gray-700': 'bg-gray-800'}`}>
      <div className={`flex justify-between gap-5 `}>
        {input ? (
          <>
            <span className='p-1 text-sm'>{inputValue}</span>
            <button className='transition-transform duration-200 hover:scale-110' onClick={ShowInput}><FontAwesomeIcon icon={faPenToSquare} /></button>
          </>
        ) : (
          <>
            <input
              className="text-white max-w-28 focus:outline-none bg-gray-700 p-1 rounded-sm text-sm"
              type="text"
              value={inputValue}
              onChange={handleChange}
              ref={inputRef}
            />
            <button onClick={ShowInput}><FontAwesomeIcon icon={faFloppyDisk} /></button>
          </>
        )}
      </div>
      <p className='text-sm p-1'>Points: {points}</p>
    </div>
  );
}

export default PlayerOne;
