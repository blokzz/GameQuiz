import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
interface CellProps {
  point: number;
  revealed: string;
  playeronepoints:React.Dispatch<React.SetStateAction<number>>
  playertwopoints:React.Dispatch<React.SetStateAction<number>>
  flippedCell:boolean;
  setFlippedCell: React.Dispatch<React.SetStateAction<boolean>>;
  choosePlayer:string;
  setChosenPlayer: React.Dispatch<React.SetStateAction<string>>;
  showModal:React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestion:React.Dispatch<React.SetStateAction<string>>;
}

const Cell: React.FC<CellProps> = ({ point, revealed , playeronepoints , playertwopoints , flippedCell , setFlippedCell ,choosePlayer, setChosenPlayer,showModal , setCurrentQuestion }) => {
  // czy karta była już odwrócona (pierwszy raz)
  const [flipable , setFlipable] = useState<boolean>(true)
  // czy odpowiedź na pytanie zakończona
  const [answered , setAnswered] = useState<boolean>(false)
  // flipowanie karty 
  const [flipped, setFlipped] = useState(false);
  // typ odpowiedzi dobra czy zła
  const [answerType, setAnswerType ] = useState<string>('')



  // Obsługa kliknięcia w karte
  const handleClick = () => {
    // Jeżeli karta jest obrócona to niemożna jej obrócić 
    if(flipable && flippedCell==false){
    setCurrentQuestion(revealed)
    setFlippedCell(true)
    setFlipped(true)
    setFlipable(false)
    }
 
    
  };
  // Obsługa zmiany punktów graczy
  const handlePoints = () =>{
    //obraca karte po przydzieleniu punktów i można ją obrócić ponownie
    if(choosePlayer == 'p1'){
      playeronepoints(Prevpoints=>Prevpoints + point)
      setAnswerType('correct')
      //zeby nie mozna było obrócić znowu tej samej podczas odpowiedzi
      setFlipped(false)
      //zeby nie mozna było obrócić po udzieleniu odpowiedzi
      setAnswered(true)
      // żeby tylko jedna naraz mogła być 
      setFlippedCell(false)
      setChosenPlayer('')
    }
    else if(choosePlayer == 'p2'){
      playertwopoints(Prevpoints=>Prevpoints + point)
      setAnswerType('correct')
      //zeby nie mozna było obrócić znowu tej samej podczas odpowiedzi
      setFlipped(false)
      //zeby nie mozna było obrócić po udzieleniu odpowiedzi
      setAnswered(true)
      // żeby tylko jedna naraz mogła być 
      setFlippedCell(false)
      setChosenPlayer('')
    }
  }

  const handleWrongAnswer = () => {
    setAnswerType('incorrect')
    setFlipped(false)
    setAnswered(true)
    setFlippedCell(false)
    setChosenPlayer('')
  }

  const handleQuestionSteal = () => {
    choosePlayer=='p1'? setChosenPlayer('p2') : setChosenPlayer('p1') 
  }

  return (
    <div
    onClick={handleClick}
    className={`w-full p-2 flex flex-col items-center justify-center border-2 rounded-sm border-gray-300 relative transition-transform duration-500 bg-gray-800 ${
      flipped ? 'rotate-y-180' : ''
    } ${answered ? 'opacity-60':''} ${answerType === 'correct' ? 'border-green-300' : answerType === 'incorrect' ? 'border-red-300' : 'border-gray-300'}  transform-style-preserve-3d`}
    >
    <div className={`backface-hidden flex absolute w-full h-full text-center justify-center items-center transition-opacity duration-500 ${
      flipped ? 'opacity-0' : 'opacity-100'
    }`}>
      <p>{point}</p>
    </div>
    <div className={`backface-hidden flex flex-col gap-4 absolute w-full h-full text-center justify-center items-center rotate-y-180 transition-opacity duration-500 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
      <p>{typeof revealed == 'string' ? revealed : revealed[0]}</p>
      <span className='text-xs text-blue-600 cursor-pointer' onClick={()=>{showModal(true)}}>{typeof revealed == 'object' ? (<>Show image</>): "" }</span>
      <div className={'flex flex-row gap-4'}>
         {choosePlayer=='' ? (
         <>
          <button  onClick={()=>{setChosenPlayer('p1')}} className={'bg-gray-600 min-w-14 transition-transform duration-200 hover:scale-110'}>P1</button>
          <button  onClick={()=>{setChosenPlayer('p2')}}className={'bg-gray-600 min-w-14 transition-transform duration-200 hover:scale-110'}>P2</button>
         </>)
         :(
         <div className={'flex flex-row gap-4'}>
         <button className='transition-transform duration-200 hover:scale-110 hover:text-green-500' onClick={handlePoints}><FontAwesomeIcon icon={faCheck} /></button>
         <button className='transition-transform duration-200 hover:scale-110 hover:text-yellow-600' onClick={handleQuestionSteal}>change</button>
         <button className='transition-transform duration-200 hover:scale-110 hover:text-red-500' onClick={handleWrongAnswer}><FontAwesomeIcon icon={faXmark} /></button>
         </div>)}
      </div>
    </div>
  </div>
  );
};

export default Cell;