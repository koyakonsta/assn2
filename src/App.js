import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Degrees from "./pages/degrees";
import Degree from "./pages/degree";
import CreateDegree from "./pages/createdegree";
import Cohorts from "./pages/cohorts";
import Cohort from "./pages/cohort";
import CohortModules from "./pages/cohortmodules";
import CreateCohort from "./pages/createcohort";
import Modules from "./pages/modules";
import Module from "./pages/module";
import NavBar from "./pages/navbar";
import CreateModule from "./pages/createmodule";
import Student from "./pages/student";
import SetGrade from "./pages/setgrade";
import CreateStudent from "./pages/createstudent";
import './App.css';

export default function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}> 
          <Route path="degrees" element={<Degrees />}/> 
          <Route path="modules/" element={<Modules />} />
          <Route path="module/:md/" element={<Module />} />
          <Route path="student/:std/" element={<Student />} />
          <Route path="degree/:dg/" element={<Degree />} />
          <Route path="setgrade/:std/:mod/" element={<SetGrade />} />
          <Route path="createdegree/" element={<CreateDegree />} />
          <Route path="createcohort/" element={<CreateCohort />} />
          <Route path="createmodule/" element={<CreateModule />} />
          <Route path="createstudent/" element={<CreateStudent />} />
          <Route path="cohorts/" element={<Cohorts />} />
          <Route path="cohort/:ch/" element={<Cohort />} />
          <Route path="cohortmodules/:ch/" element={<CohortModules />} />

        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
 