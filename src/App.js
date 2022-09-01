import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import HereBeDragons from "./views/HereBeDragons";
import AbilityScores from "./views/AbilityScores";
import Alignments from "./views/Alignments";
import Classes from "./views/Classes";
import SelectedClass from "./views/SelectedClass";
import Backgrounds from "./views/Backgrounds";
import SelectedBg from "./views/SelectedBg";




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
    <Route path="classes" element={ <Classes/> } />
    <Route path="selectedclass" element={ <SelectedClass/> } />
    <Route path="backgrounds" element={ <Backgrounds/> } />
    <Route path="selectedbg" element={ <SelectedBg/> } />

  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
