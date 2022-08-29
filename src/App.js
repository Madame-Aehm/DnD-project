import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import HereBeDragons from "./views/HereBeDragons";


function App() {
  return (
<>
<BrowserRouter>
  <Routes>
    <Route path="/" element={ <Home/> } />
    <Route path="login" element={ <Login/>}  />
    <Route path="explore" element={ <Explore/> } />
    <Route path="*" element={ <HereBeDragons/> } />
  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
