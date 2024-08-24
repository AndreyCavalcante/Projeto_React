import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './component/pages/Home';
import Company from './component/pages/Company';
import Contact from './component/pages/Contact';
import NewProject from './component/pages/NewProject';
import Projects from './component/pages/Projects';
import Project from './component/pages/Project'

import NavBar from './component/layout/NavBar';
import Container from './component/layout/Container';
import Footer from './component/layout/Footer'

function App() {
  return (
    <Router>

      <NavBar/>

      <Container customClass="min_height">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/Projects' element={<Projects/>}></Route>
          <Route path="/Company" element={<Company />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/NewProject" element={<NewProject />}></Route>
          <Route path="/Project/:id" element={<Project />}></Route>
        </Routes>
      </Container>

      <Footer/>

    </Router>
  );
}

export default App;
