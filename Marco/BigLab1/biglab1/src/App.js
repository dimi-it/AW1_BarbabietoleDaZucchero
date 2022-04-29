import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarTop } from './Nav';
import './style.css'
import { Container, Row, Col } from 'react-bootstrap';
import { SidebarLeft } from './Sidebar';
import dayjs from 'dayjs';
import { FilmList } from './Films';
import { filmsTest } from './Films';
import { useState } from 'react';

function App() {

  const [films, setFilms] = useState(filmsTest);

  function deleteFilm(id) {
    if (id === 'favorites') {
      setFilms( filmsTest.filter((f)=> f.favorite ));
    }
    else if(id === 'rated'){
      setFilms( filmsTest.filter((f)=> f.rating === 5 ));
    }
    else if(id === 'seenLastMonth'){ 
      let f1 = filmsTest.filter((f) => f.watchDate);
      setFilms( f1.filter((f) => {const diff = f.watchDate.diff(dayjs(),'month');
                                  const ret = diff <= 0 && diff > -1;
                                  return ret;}));
    }
    else if(id === 'unseen'){
      setFilms( filmsTest.filter((f)=> !f.watchDate ));
    }
  }
  
  return(
    <>
   <NavBarTop></NavBarTop>

   <div class="container-fluid">
      <div class="row vheight-100">
        <aside class="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
          <SidebarLeft deleteFilm={deleteFilm} setFilms={setFilms} filmsTest={filmsTest}></SidebarLeft>
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
                <FilmList films={films}></FilmList>
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
