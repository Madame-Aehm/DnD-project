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
import Conditions from "./views/Conditions";
import DamageTypes from "./views/DamageTypes";
import Equipment from "./views/Equipment";
import SelectedEquipment from "./views/SelectedEquipment";
import EquipmentCategories from "./views/EquipmentCategories";
import SelectedEquipmentCategory from "./views/SelectedEquipmentCategory";
import Feats from "./views/Feats";
import Features from "./views/Features";
import SelectedFeature from "./views/SelectedFeature";
import Languages from "./views/Languages";




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
    <Route path="conditions" element={ <Conditions/> } />
    <Route path="damagetypes" element={ <DamageTypes/> } />
    <Route path="equipment" element={ <Equipment/> } />
    <Route path="selectedequipment" element={ <SelectedEquipment/> } />
    <Route path="equipmentcategories" element={ <EquipmentCategories/> } />
    <Route path="selectedequipmentcategory" element={ <SelectedEquipmentCategory/> } />
    <Route path="feats" element={ <Feats/> } />
    <Route path="features" element={ <Features/> } />
    <Route path="selectedfeature" element={ <SelectedFeature/> } />
    <Route path="languages" element={ <Languages/> } />


  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
