import { Table, Button} from 'react-bootstrap';
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

const applyFilter = (films_tofilter, id_filter) =>
{
    switch(id_filter)
    {
      case 'All': 
        return films_tofilter;
      case 'Favorite': 
        return films_tofilter.filter((f)=> f.favorite );
      case 'Best rating': 
        return films_tofilter.filter((f) => f.rating === 5);
      case 'Watched last month':
        let f1 = films_tofilter.filter((f) => f.watchDate);
        return f1.filter((f) => {const diff = f.watchDate.diff(dayjs(),'month');
          const ret = diff <= 0 && diff > -1;
          return ret;});
      case 'Unseen': 
        return films_tofilter.filter((f)=> !f.watchDate );
      default: return films_tofilter;
      
    }
}

function FilmList(props) {

    return (
      <FilmTable films={props.films} deleteFilm={props.deleteFilm} changeFavourite={props.changeFavourite}></FilmTable>
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
            props.films.map((f) => <FilmRow film={f} deleteFilm={props.deleteFilm} changeFavourite={props.changeFavourite}/>)
          }
        </tbody>
      </Table>
      </>
    );
  }
  
  function FilmRow(props) {
    return (
      <tr><FilmData film={props.film} changeFavourite={props.changeFavourite} /><FilmDelete id={props.film.id} deleteFilm={props.deleteFilm}/></tr>
    );
  }

  function FilmDelete(props) {
    return <td><Button variant='danger'
      onClick={() => { props.deleteFilm(props.id) }}
    ><i className='bi bi-trash3'></i></Button></td>
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
    onChange={() => { props.changeFavourite(props.film.id) }}
    checked={props.film.favorite}
    />;

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
  export { applyFilter };