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
    this.printLibrary = () => this.library.forEach(f => console.log(f));
    this.sortByDate = () => (
        this.library.sort(
            (a, b) => (a.date.diff(b.date))
        )
    );
    this.daleteFilm = (id) => {
        let tmp = this.library.filter((film) => (film.id != id));
        this.library = tmp;
    };
    this.resetWatchedFilm = () => (
        this.library.forEach((film) => (film.date = undefined))
    );
    this.getRated = () => (
        this.library
        .filter((film) => (film.rating != undefined))
        .sort((a,b) => (b.rating - a.rating))
    );
}

let film1 = new Film(1, "film 1");
let film2 = new Film(2, "film 2", dayjs('2022-03-10'), true, 5);
let film3 = new Film(3, "film 3", dayjs('2022-03-8'), false, 1);

let filmLibrary = new FilmLibrary();
filmLibrary.addNewFilm(film1);
filmLibrary.addNewFilm(film2);
filmLibrary.addNewFilm(film3);

//Library
console.log("----Library----");
filmLibrary.printLibrary();

//Sort
console.log("\n----Sort----");
let librarySorted = filmLibrary.sortByDate();
console.log(librarySorted);

//Delete
console.log("\n----Delete----");
filmLibrary.daleteFilm(2);
filmLibrary.printLibrary();
filmLibrary.addNewFilm(film2);  //film re-added

//Reset
console.log("\n----Reset----");
filmLibrary.resetWatchedFilm();
filmLibrary.printLibrary();

//Rating
console.log("\n----Rating----");
let libraryRated = filmLibrary.getRated();
console.log(libraryRated);