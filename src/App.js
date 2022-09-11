import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import HereBeDragons from "./views/HereBeDragons";
import AbilityScores from "./views-explore/AbilityScores";
import Alignments from "./views-explore/Alignments";
import Classes from "./views-explore/Classes";
import SelectedClass from "./views-explore/SelectedClass";
import Backgrounds from "./views-explore/Backgrounds";
import SelectedBg from "./views-explore/SelectedBg";
import Conditions from "./views-explore/Conditions";
import DamageTypes from "./views-explore/DamageTypes";
import Equipment from "./views-explore/Equipment";
import SelectedEquipment from "./views-explore/SelectedEquipment";
import EquipmentCategories from "./views-explore/EquipmentCategories";
import SelectedEquipmentCategory from "./views-explore/SelectedEquipmentCategory";
import Feats from "./views-explore/Feats";
import Features from "./views-explore/Features";
import SelectedFeature from "./views-explore/SelectedFeature";
import Languages from "./views-explore/Languages";
import MagicItems from "./views-explore/MagicItems";
import MagicSchools from "./views-explore/MagicSchools";
import Proficiencies from "./views-explore/Proficiencies";
import SelectedProficiency from "./views-explore/SelectedProficiency";
import Monsters from "./views-explore/Monsters";
import SelectedMonster from "./views-explore/SelectedMonster";
import Races from "./views-explore/Races";
import SelectedRace from "./views-explore/SelectedRace";
import Skills from "./views-explore/Skills";
import Spells from "./views-explore/Spells";
import SelectedSpell from "./views-explore/SelectedSpell";
import SubClasses from "./views-explore/SubClasses";
import Subraces from "./views-explore/Subraces";
import Traits from "./views-explore/Traits";
import SelectedTrait from "./views-explore/SelectedTrait";
import WeaponProperties from "./views-explore/WeaponProperties";
import SignUp from "./views/SignUp";
import LogInSuccess from "./views/LogInSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import Favourites from "./views/Favourites";
import Characters from "./views/Characters";
import RuleSections from "./views-explore/RuleSections";
import Rules from "./views-explore/Rules";



function App() {
  return (
<>
<BrowserRouter>
    <AuthContextProvider>
      <Routes>

      <Route path="*" element={ <HereBeDragons/> } />
      <Route path="/" element={ <Home/> } />
        <Route path="login" element={ <Login/>}  />
          <Route path="login-success" element={ <LogInSuccess/> } />
        <Route path="signup" element={ <SignUp/> } />
        <Route path="favourites" element={ <ProtectedRoute> <Favourites/> </ProtectedRoute>  } />
        <Route path="characters" element={ <ProtectedRoute> <Characters/> </ProtectedRoute> } />
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
          <Route path="rulesections" element={ <RuleSections/> } />
          <Route path="rules" element={ <Rules/> } />
          <Route path="skills" element={ <Skills/> } />
          <Route path="spells" element={ <Spells/> } />
            <Route path="selectedspell" element={ <SelectedSpell/> } />
          <Route path="subclasses" element={ <SubClasses/> } />
          <Route path="subraces" element={ <Subraces/> } />
          <Route path="traits" element={ <Traits/> } />
            <Route path="selectedtrait" element={ <SelectedTrait/> } />
          <Route path="weaponproperties" element={ <WeaponProperties/> } />
            
      
    
        
      </Routes>
    </AuthContextProvider>
</BrowserRouter>
</>

  );
}

export default App;
