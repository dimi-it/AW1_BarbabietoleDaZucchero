import { Table, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

const starEmpty = <i class="bi bi-star"></i>
const starFilled = <i class="bi bi-star-fill"></i> 

function FilmList(props) {

    return (
      <FilmTable films={props.films}></FilmTable>
    );
  }

  function FilmTable(props) {
    const [films, setFilms] = useState(props.films);

    function deleteFilm(id) {
      // setFilms(...)   // remove exam
      setFilms( films.filter( (f)=> f.id !== id ) );
    }
  
    return (
      <>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>title</th>
            <th>favorite</th>
            <th>watchDate</th>
            <th>rating</th>
          </tr>
        </thead>
        <tbody>
          {
            films.map((f) => <FilmRow film={f} key={f.id} deleteFilm={deleteFilm} />)
          }
        </tbody>
      </Table>
      </>
    );
  }
  
  function FilmRow(props) {
    return (
      <tr><FilmData film={props.film} />{/*<ExamActions code={props.exam.code} deleteExam={props.deleteExam} />*/}</tr>
    );
  }
  
  function FilmData(props) {

    const size = 5;
    const cells = [];
    for (let i=0; i<size; i++) {
        if(i < props.film.rating){
            cells.push( 
                starFilled
              )
        }
        else{
            cells.push( 
                starEmpty
              )
        }
    }

    let fav =
    <input
    name="presente"
    type="checkbox"
    checked={props.film.favorite}/>;

    let wDate = props.film.watchDate ? props.film.watchDate.format('YYYY-MM-DD') : '';


    return (
      <>
        <td>{props.film.id}</td>
        <td>{props.film.title}</td>
        <td>{fav}</td>
        <td>{wDate}</td>
        <td>{cells}</td>
      </>
    );
  }
  

  export { FilmList };
