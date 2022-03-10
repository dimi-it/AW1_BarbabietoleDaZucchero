"use strict"

const dayjs = require("dayjs");

function Film(id, title, date = undefined, favorite = false, rating = undefined) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary() {
    this.library = [];

    this.addNewFilm = (film) => (this.library.push(film));
}

let film1 = new Film(1, "film 1");
let film2 = new Film(2, "film 2", dayjs('2022-03-10'), true, 5);
let film3 = new Film(3, "film 3", dayjs('2022-03-8'), false, 1);

let filmLibrary = new FilmLibrary();
filmLibrary.addNewFilm(film1);
filmLibrary.addNewFilm(film2);
filmLibrary.addNewFilm(film3);

filmLibrary.library.forEach(f => console.log(f));
