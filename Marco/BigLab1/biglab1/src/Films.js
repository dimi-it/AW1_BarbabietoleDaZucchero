import { Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';

const starEmpty = <i class="bi bi-star"></i>
const starFilled = <i class="bi bi-star-fill"></i> 

const filmsTest = [
  // Data Strucutre: id, title, favorite, watchDate, rating
  {id: 1, title: "Pulp Fiction", favorite: true, watchDate: dayjs('2022-04-10'), rating: 5},
  {id: 2, title: "21 Grams", favorite: true, watchDate: dayjs('2022-03-17'), rating: 4},
  {id: 3, title: "Star Wars", favorite: false},
  {id: 4, title: "Matrix", favorite: true},
  {id: 5, title: "Shrek", favorite: false, watchDate: dayjs('2022-04-21'), rating: 3}
];

function FilmList(props) {

    return (
      <FilmTable films={props.films}></FilmTable>
    );
  }


  function FilmTable(props) {
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
            props.films.map((f) => <FilmRow film={f} />)
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
  export { filmsTest };