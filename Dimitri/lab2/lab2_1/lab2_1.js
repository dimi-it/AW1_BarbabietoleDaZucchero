"use strict"

const sqlite3 = require("sqlite3")
const dayjs = require("dayjs");

function Film(id, title, favorite = false, watchDate = 'a', rating = null) {
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

    this.closeDb = () => {
        return new Promise((resolve, reject) => {
            if(db == undefined){
                reject(new Error('Databese not defined'));
            }
            db.close((err) => {if(err) throw err});
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

    console.log("----Get All!----");
    try{
        const films = await filmLibrary.getAllAsync();
        films.forEach(film => {
            console.log(film.toString());
        });
    }
    catch(e){
        console.log(e.toString());
    }

    console.log("----Get Favorites!----");
    try{
        const films = await filmLibrary.getFavoritesAsync();
        films.forEach(film => {
            console.log(film.toString());
        });
    }
    catch(e){
        console.log(e.toString());
    }

    console.log("----Get Watched Today!----");
    try{
        const films = await filmLibrary.getWatchedTodayAsync();
        films.forEach(film => {
            console.log(film.toString());
        });
    }
    catch(e){
        console.log(e.toString());
    }

    console.log("----Get Watched Before Date!----");
    try{
        const films = await filmLibrary.getWatchedBeforeDateAsync(dayjs("2022-03-21").format("YYYY-MM-DD"));
        films.forEach(film => {
            console.log(film.toString());
        })
    }
    catch(e){
        console.log(e.toString);
    }

    console.log("----Get Rated More Than!----");
    try{
        const films = await filmLibrary.getRatedMoreThanAsync(3);
        films.forEach(film => {
            console.log(film.toString());
        })
    }
    catch(e){
        console.log(e.toString);
    }

    console.log("----Get with title containing word!----");
    try{
        const films = await filmLibrary.getWithTitleContainingWordAsync("f");
        films.forEach(film => {
            console.log(film.toString());
        })
    }
    catch(e){
        console.log(e.toString);
    }

    
    console.log("----Close Db!----");
    try{
        await filmLibrary.closeDb();
    }
    catch(e){
        console.log(e.toString());
    }
}

main();

