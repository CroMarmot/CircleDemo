import './App.css';
import {MatterJsGame} from "./Components/MatterJsGame";

function App() {
    /* <Stage width={100} height={200}>
         <GameCircle x={10} y={10} lvl={0}/>
         <GameCircle x={30} y={10} lvl={1}/>
         <GameCircle x={50} y={50} lvl={2}/>
         <GameCircle x={30} y={90} lvl={3}/>
     </Stage> */
  return (
    <div className="App">
        <MatterJsGame />
   </div>
  );

}

export default App;
