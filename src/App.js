import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import HereBeDragons from "./views/HereBeDragons";
import AbilityScores from "./views/AbilityScores";
import Alignments from "./views/Alignments";


function App() {
  return (
<>
<BrowserRouter>
  <Routes>
    <Route path="*" element={ <HereBeDragons/> } />
    <Route path="/" element={ <Home/> } />
    <Route path="login" element={ <Login/>}  />
    <Route path="explore" element={ <Explore/> } />
    <Route path="abilityscores" element={ <AbilityScores/> } />
    <Route path="alignments" element={ <Alignments/> } />
  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
