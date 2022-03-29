"use strict"

const sqlite3 = require("sqlite3")
const dayjs = require("dayjs");

function Film(id, title, favorite = false, watchDate = null, rating = null) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.rating = rating;
    // saved as dayjs object
    this.watchDate = watchDate;
  
    this.toString = () => {
      return `Id: ${this.id}, ` +
      `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this.rating}, ` +
      `watchDate: ${this.watchDate}`;
    }
}

function FilmLibrary() {
    let db = undefined;
    
    this.openDb = (dbName) => {
        return new Promise((resolve, reject) => {
            db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
                if(err){
                    db = undefined;
                    reject(err);
                }
                else{
                    resolve();   
                }
            })
        })
    }

    this.getAllAsync = () => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "select * from films"; 
            db.all(query, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating))
                    resolve(films);
                }
            }) 
        })
    }

    this.getFavoritesAsync = () => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "select * from films where favorite=1";
            db.all(query, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating))
                    resolve(films);
                }
            }) 
        })
    }

    this.getWatchedTodayAsync = () => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "select * from films where watchdate = ?";
            db.all(query, dayjs().format("YYYY-MM-DD"), (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating))
                    resolve(films);
                }
            })
        })
    }

    this.getWatchedBeforeDateAsync = (date) => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "select * from films where watchdate <= ?";
            db.all(query, date, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating))
                    resolve(films);
                }
            })
        })
    }

    this.getRatedMoreThanAsync = (rating) => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "select * from films where rating >= ?";
            db.all(query, rating, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating))
                    resolve(films);
                }
            })
        })
    }

    this.getWithTitleContainingWordAsync = (word) => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "select * from films where title like ?";
            db.all(query, `%${word}%`, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating))
                    resolve(films);
                }
            })
        })
    }

    this.closeDbAsync = () => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            db.close((err) => {if(err) throw err});
        })
    }

    this.insertFilmAsync = (film) => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "INSERT INTO films (id, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?)";
            db.run(query, [film.id, film.title, film.favorite, film.watchDate, film.rating], (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }

    this.removeFilmAsync = (id) => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "delete from films where id = ?";
            db.run(query, id, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }

    this.deleteAllWatchDatesAsync = () => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            const query = "update films set watchdate = null where watchdate is not null";
            db.run(query, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }
}

async function main(){
    const filmLibrary = new FilmLibrary();

    try{
        await filmLibrary.openDb("films.db");
        console.log("----Database opened!----\n");
    }
    catch(e){
        console.log(e.toString());
        return;
    }
    
    console.log("----Insert new film!----");
    try{
        const film = new Film(7, "Up", 1, dayjs().format("YYYY-MM-DD"), 4);
        await filmLibrary.insertFilmAsync(film);
        console.log("Inserted new film: " + film.toString());
    }
    catch(e){
        console.log(e.toString());
    }

    console.log("----Delete film!----");
    try{
        const id = 7;
        await filmLibrary.removeFilmAsync(id);
        console.log("Removed film with Id: " + id);
    }
    catch(e){
        console.log(e.toString());
    }

    console.log("----Reset watchdate!----");
    try{
        await filmLibrary.deleteAllWatchDatesAsync();
        console.log("All watchdate resetted");
    }
    catch(e){
        console.log(e.toString());
    }

    console.log("----Close Db!----");
    try{
        await filmLibrary.closeDbAsync();
    }
    catch(e){
        console.log(e.toString());
    }
}

main();

