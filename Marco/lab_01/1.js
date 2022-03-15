"use strict"


const dayjs = require('dayjs');


let n = 0;

function Film(id, title, favorites=false, date=undefined, rating=NaN){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    let library = []

    return{
        addNewFilm : function (f) {
            library.push(f);
        },
        printLib : function () {
            console.log(library);
        }
    }; 
}

let film1 = new Film(++n, "Pulp Fiction", true, dayjs('2022-03-10'), 5);
let film2 = new Film(++n, "21 Grams", true, dayjs('2022-03-17'), 4);
let film3 = new Film(++n, "Star Wars", false);
let film4 = new Film(++n, "Matrix", false);
let film5 = new Film(++n, "Shrek", false, dayjs('2022-03-21'), 3);

let lib = FilmLibrary();
lib.addNewFilm(film1);
lib.addNewFilm(film2);
lib.addNewFilm(film3);
lib.addNewFilm(film4);
lib.addNewFilm(film5);

lib.printLib();