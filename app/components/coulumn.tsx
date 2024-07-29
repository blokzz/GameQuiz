import { FC } from 'react';
import { Game } from '../types';
import Cell from './cell';
interface CoulumnProps {
  game: Game;
  player1points: React.Dispatch<React.SetStateAction<number>>;
  player2points: React.Dispatch<React.SetStateAction<number>>;
  flippedCell:boolean;
  setFlippedCell: React.Dispatch<React.SetStateAction<boolean>>;
  chooseplayer:string;
  setchosenplayer:React.Dispatch<React.SetStateAction<string>>;
  showModal:React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestion:React.Dispatch<React.SetStateAction<string>>;

  
}
const Coulumn: FC<CoulumnProps> = ({  game ,player1points , player2points , flippedCell , setFlippedCell , chooseplayer , setchosenplayer , showModal ,setCurrentQuestion}) => {
    return (
      <div  className="flex flex-row flex-wrap w-full h-full">
         <ul className="flex flex-row flex-wrap w-full h-full gap-3">
        {Object.entries(game.questions).map(([points, question]) => (
         <Cell key={question} point={Number(points)} revealed={question} 
         playeronepoints={player1points} 
         playertwopoints={player2points} 
         flippedCell={flippedCell} 
         setFlippedCell={setFlippedCell}
         choosePlayer={chooseplayer}
         setChosenPlayer={setchosenplayer}
         showModal={showModal}
         setCurrentQuestion={setCurrentQuestion}></Cell>
        ))}
      </ul>
      </div>
    );
  };
  export default Coulumn;