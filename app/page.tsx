"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import Coulumn from "./components/coulumn";
import { Game } from "./types";
import PlayerOne from "./components/player1";
import PlayerTwo from "./components/player2";
import Modal from "./components/modal";

export default function Home() {
  const [data, setData] = useState<Game[]>([]);
  const [playerOnePoints, setPlayerOnePoints] = useState<number>(0);
  const [playerTwoPoints, setPlayerTwoPoints] = useState<number>(0);
  const [flippedCell , setFlippedCell] = useState<boolean>(false)
  const [ChoosePlayer, setChosenPlayer] = useState<string>('');
  const [modal,showModal] = useState(false)
  const [currentQuestion, setCurrentQuestion]= useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/Sets.json');
      const data: Game[] = await res.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <>
    <PlayerOne points={playerOnePoints}
     chooseplayer={ChoosePlayer}/>
    <PlayerTwo points={playerTwoPoints}
     chooseplayer={ChoosePlayer}/>
    {modal ? (<Modal currentQuestion={currentQuestion} showModal={showModal}/>) : ''}
    <main className="flex h-lvh flex-col items-center p-16">
      <h1 className="text-2xl">Game Quiz</h1>
      <div className="flex flex-row items-center w-5/6 h-full gap-3 mt-5">
        {data.map((col, index )=> (
          <div key={index} className="h-full w-full flex flex-col">
            <span className="justify-center items-center flex">{col.category}</span>
            <Coulumn  game={col} 
            player1points={setPlayerOnePoints} 
            player2points={setPlayerTwoPoints} 
            flippedCell={flippedCell} 
            setFlippedCell={setFlippedCell}
            chooseplayer={ChoosePlayer}
            setchosenplayer={setChosenPlayer}
            showModal={showModal}
            setCurrentQuestion={setCurrentQuestion}></Coulumn>
          </div>
        ))}
      </div>
    </main>
    </>
  );
}