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
import MagicItems from "./views/MagicItems";
import MagicSchools from "./views/MagicSchools";
import Proficiencies from "./views/Proficiencies";
import SelectedProficiency from "./views/SelectedProficiency";
import Monsters from "./views/Monsters";
import SelectedMonster from "./views/SelectedMonster";
import Races from "./views/Races";
import SelectedRace from "./views/SelectedRace";
import Skills from "./views/Skills";
import Spells from "./views/Spells";
import SelectedSpell from "./views/SelectedSpell";
import SubClasses from "./views/SubClasses";
import Subraces from "./views/Subraces";
import Traits from "./views/Traits";
import SelectedTraitOrProperty from "./views/SelectedTraitOrProperty";
import WeaponProperties from "./views/WeaponProperties";
import SignUp from "./views/SignUp";
import LogInSuccess from "./views/LogInSuccess";




function App() {
  return (
<>
<BrowserRouter>
  <Routes>
    <Route path="*" element={ <HereBeDragons/> } />
    <Route path="/" element={ <Home/> } />
      <Route path="login" element={ <Login/>}  />
        <Route path="login-success" element={ <LogInSuccess/> } />
      <Route path="signup" element={ <SignUp/> } />
      <Route path="explore" element={ <Explore/> } />
        <Route path="abilityscores" element={ <AbilityScores /> } />
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
        <Route path="magicitems" element={ <MagicItems/> } />
        <Route path="magicschools" element={ <MagicSchools/> } />
        <Route path="proficiencies" element={ <Proficiencies/> } />
          <Route path="selectedproficiency" element={ <SelectedProficiency/> } />
        <Route path="monsters" element={ <Monsters/> } />
          <Route path="selectedmonster" element={ <SelectedMonster/> } />
        <Route path="races" element={ <Races/> } />
          <Route path="selectedrace" element={ <SelectedRace/> } />
        <Route path="skills" element={ <Skills/> } />
        <Route path="spells" element={ <Spells/> } />
          <Route path="selectedspell" element={ <SelectedSpell/> } />
        <Route path="subclasses" element={ <SubClasses/> } />
        <Route path="subraces" element={ <Subraces/> } />
        <Route path="traits" element={ <Traits/> } />
        <Route path="weaponproperties" element={ <WeaponProperties/> } />
          <Route path="selectedtrait" element={ <SelectedTraitOrProperty/> } />



  </Routes>
</BrowserRouter>
</>

  );
}

export default App;
