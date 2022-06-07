import './styles/App.css';
import GeneralSection from './components/GeneralSection';
import AcademicSection from './components/AcademicSection';
import ProfessionalSection from './components/ProfessionalSection';



import React from 'react';

function App() {

  return (
    <div className="div-cont">

      <h1 className="cv-title">New Flash CiVi  <i>**with Hooks**</i></h1>

      <GeneralSection></GeneralSection>

      <AcademicSection></AcademicSection>

      <ProfessionalSection></ProfessionalSection>

    </div>
  );

}

export default App;




