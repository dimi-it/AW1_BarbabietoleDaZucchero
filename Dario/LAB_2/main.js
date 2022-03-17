"use strict";

const dayjs = require("dayjs");
let FilmLibrary = require("./FilmLibrary")

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
    /*FilmLibrary.insertFilm({ id: 8, title: "Star Trek", favorite: true, watchdate: dayjs('2022-03-24').format('YYYY-MM-DD'), rating: 7})
    .then((x) => console.log(x));*/

    //test delete film
    /*FilmLibrary.deleteFilmByID(5)
    .then((x) => console.log(x));*/

    //test delete all watchdate
    /*FilmLibrary.deleteAllWatchDate()
    .then((x) => console.log(x));*/

    //test get films containing string in title
    try{
        const result = await FilmLibrary.getFilmsContainingTitle("Star");
        return result;
    }
    catch (err) {
        console.log("Caught Error: " + err);
    }
}

main().then( (x) => {  console.log(x); FilmLibrary.closeDataBase(); } );