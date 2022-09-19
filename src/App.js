import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./views/Home";
import Login from "./views/Login";
import Explore from "./views/Explore";
import AbilityScores from "./views-explore/AbilityScores";
import Alignments from "./views-explore/Alignments";
import EquipmentCategories from "./views-explore/EquipmentCategories";
import SelectedEquipmentCategory from "./views-explore/SelectedEquipmentCategory";
import SignUp from "./views/SignUp";
import LogInSuccess from "./views/LogInSuccess";
import Favourites from "./views/Favourites";
import Characters from "./views/Characters";
import Rules from "./views-explore/Rules";
import SelectedRule from "./views-explore/SelectedRule";
import NewCharacter from "./views/NewCharacter";
import HereBeDragons from "./components/HereBeDragons";
import SelectedList from "./views-explore/SelectedList";
import Selected from "./views-explore/Selected";


function App() {
  return (
<>
<BrowserRouter>
    <AuthContextProvider>
      <Routes>
      <Route path="*" element={ <HereBeDragons/> } />
      <Route path="/" element={ <Home/> } />
        <Route path="login" element={ <Login/> } />
          <Route path="login-success" element={ <LogInSuccess/> } />
        <Route path="signup" element={ <SignUp/> } />
        <Route path="favourites" element={ <ProtectedRoute> <Favourites/> </ProtectedRoute>  } />
        <Route path="characters" element={ <ProtectedRoute> <Characters/> </ProtectedRoute> } />
          <Route path="newcharacter" element={ <ProtectedRoute> <NewCharacter/> </ProtectedRoute> } />
        <Route path="explore" element={ <Explore/> } />

          <Route path="ability-scores" element={ <AbilityScores /> } />
          <Route path="alignments" element={ <Alignments/> } />

          <Route path="backgrounds" element={ <SelectedList/> } />
          <Route path="classes" element={ <SelectedList/> } />
          <Route path="conditions" element={ <SelectedList/> } />
          <Route path="damage-types" element={ <SelectedList/> } />
          <Route path="equipment" element={ <SelectedList/> } />

          <Route path="equipment-categories" element={ <EquipmentCategories/> } />
            <Route path="selectedequipmentcategory" element={ <SelectedEquipmentCategory/> } />

          <Route path="feats" element={ <SelectedList/> } />
          <Route path="features" element={ <SelectedList/> } />
          <Route path="languages" element={ <SelectedList/> } />
          <Route path="magic-items" element={ <SelectedList/> } />
          <Route path="magic-schools" element={ <SelectedList/> } />
          <Route path="monsters" element={ <SelectedList/> } />
          <Route path="proficiencies" element={ <SelectedList/> } />
          <Route path="races" element={ <SelectedList/> } />

          <Route path="rules" element={ <Rules/> } />
            <Route path="selected-rule" element={ <SelectedRule/> } />
            
          <Route path="rule-sections" element={ <SelectedList/> } />
          <Route path="skills" element={ <SelectedList/> } />
          <Route path="spells" element={ <SelectedList/> } />
          <Route path="subclasses" element={ <SelectedList/> } />
          <Route path="subraces" element={ <SelectedList/> } />
          <Route path="traits" element={ <SelectedList/> } />
          <Route path="weapon-properties" element={ <SelectedList/> } />

            <Route path="selected" element={ <Selected/> } />

      </Routes>
    </AuthContextProvider>
</BrowserRouter>
</>

  );
}

export default App;
