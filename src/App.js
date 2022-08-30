import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import HereBeDragons from "./views/HereBeDragons";
import AbilityScores from "./views/AbilityScores";


function App() {
  return (
<>
<BrowserRouter>
  <Routes>
    <Route path="/" element={ <Home/> } />
    <Route path="login" element={ <Login/>}  />
    <Route path="explore" element={ <Explore/> } />
    <Route path="*" element={ <HereBeDragons/> } />
    <Route path="abilityscores" element={ <AbilityScores/> } />
  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
