import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import HereBeDragons from "./views/HereBeDragons";
import AbilityScores from "./views/AbilityScores";
import Alignments from "./views/Alignments";
import Classes from "./views/Classes";
import Barbarian from "./views/Barbarian";
import NavBar from "./components/NavBar";


function App() {
  return (
<>
<BrowserRouter>
  <Routes>
    <Route path="*" element={ <HereBeDragons/> } />
    <Route path="/" element={ <Home/> } />
    <Route path="login" element={ <Login/>}  />
    <Route path="explore" element={ <Explore/> } />
      <Route path="explore/abilityscores" element={ <AbilityScores/> } />
      <Route path="explore/alignments" element={ <Alignments/> } />
      <Route path="explore/classes" element={ <Classes/> } />
        <Route path="barbarian" element={ <Barbarian/> } />
  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
