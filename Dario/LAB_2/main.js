"use strict";

const dayjs = require("dayjs");
let FilmLibrary = require("./FilmLibrary")


function FilmLib()
{
    this.addNewFilm = (film) =>
    {
        this.film_list.push(film);
    }

    this.printLibrary = () =>
    {
        for (const f of this.film_list)
        console.log(f.str());
    }

    this.sortByDate = () =>
    {
        this.film_list.sort((a, b) => 
        {
            if (typeof a.watchDate === 'undefined') return 1;
            if (typeof b.watchDate === 'undefined') return -1;
            return(a.watchDate.isBefore(b));
        })
    }

    this.deleteById = (id) =>
    {
        const removeIndex = this.film_list.map(item => item.id).indexOf(id);
        if(removeIndex >= 0) this.film_list.splice(removeIndex, 1);
    }

    this.resetWatchedFilms = () =>
    {
        this.film_list = this.film_list.map( (item) => 
        {
            item.watchDate = "";
            return item;
        }
        );
    }

    this.getRated = () =>
    {
        return this.film_list.filter(item => item.rating !== undefined).sort((a,b) =>
         a.rating - b.rating
        )
    }
}


async function main()
{
    //test get All Films
    /*FilmLibrary.getAllFilms()
        .then( (result) => console.log(result))
        .catch((err) => console.log(err))*/

    //test get All Film with async
    /*try{
        const result = await FilmLibrary.getAllFilms();
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }*/

    //test get All favorite films
    /*try{
        const result = await FilmLibrary.getAllFavoriteFilms();
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }
    */

    //test get films watched today
    /*try{
        const result = await FilmLibrary.getFilmsWatchedToday();
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }*/

    //test get films watched befor date
    /*try{
        const result = await FilmLibrary.getFilmsWatchedBeforeDate(dayjs('2022-03-16').format('YYYY-MM-DD'));
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }*/

    //test get film with Lower Rating
    /*try{
        const result = await FilmLibrary.getFilmsRatingHigher(5);
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }*/

    //test get film by Title
    /*try{
        const result = await FilmLibrary.getFilmsByTitle("Matrix");
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }*/

     //test insert new film
    /*FilmLibrary.insertFilm({ id: 7, title: "Scarface", favorite: false, watchdate: dayjs().format('YYYY-MM-DD'), rating: 7})
    .then((x) => console.log(x));*/

    //test delete film
    /*FilmLibrary.deleteFilmByID(5)
    .then((x) => console.log(x));*/

    //test delete all watchdate
    FilmLibrary.deleteAllWatchDate()
    .then((x) => console.log(x));
}

main().then( (x) => {  console.log(x); FilmLibrary.closeDataBase(); } );