import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarTop } from './Nav';
import './style.css'
import { Container, Row, Col } from 'react-bootstrap';
import { SidebarLeft } from './Sidebar';
import { FilmList } from './Films';
import { filmsTest } from './Films';
import { useState } from 'react';
import { applyFilter } from './Films';

function App() {

  const [films, setFilms] = useState(filmsTest);
  const [selectedFilter, setFiltertoShow] = useState('All');

  const changeFilter = (fltName) => {
    setFiltertoShow(fltName);
  };
  
  return(
    <>
   <NavBarTop></NavBarTop>

   <div class="container-fluid">
      <div class="row vheight-100">
        <aside class="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
          <SidebarLeft changeFilter={changeFilter}></SidebarLeft>
        </aside>

        {/*<!-- Main content -->*/}
        <main class="col-md-9 col-12 below-nav">
          <Container>
            <Row>
              <Col>
                <h1>All</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <FilmList films={applyFilter(films, selectedFilter)}></FilmList>
              </Col>
            </Row>
          </Container>

          {/*<!-- Add a new film... -->*/}
          <button type="button" class="btn btn-lg btn-primary fixed-right-bottom">&#43;</button>

        </main>
        
      </div>
    </div>
    </>
  );
}

export default App;
