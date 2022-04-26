import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarTop } from './Nav';
import './style.css'
import { Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import { SidebarLeft } from './Sidebar';
import { FilmList } from './Films';

const filmsTest = [
  // Data Strucutre: id, title, favorite, watchDate, rating
  {id: 1, title: "Pulp Fiction", favorite: true, watchDate: dayjs('2022-03-10'), rating: 5},
  {id: 2, title: "21 Grams", favorite: true, watchDate: dayjs('2022-03-17'), rating: 4},
  {id: 3, title: "Star Wars", favorite: false},
  {id: 4, title: "Matrix", favorite: true},
  {id: 5, title: "Shrek", favorite: false, watchDate: dayjs('2022-03-21'), rating: 3}
];

function App() {
  return(
    <>
   <NavBarTop></NavBarTop>

   <div class="container-fluid">
      <div class="row vheight-100">
        <aside class="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
          <SidebarLeft></SidebarLeft>
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
                <FilmList films={filmsTest}></FilmList>
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
