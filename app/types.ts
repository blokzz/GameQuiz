export  interface Game {
    gameid: number;
    category:string;
    type: string;
    questions: {
        [key:number]:string;
    };
  }

