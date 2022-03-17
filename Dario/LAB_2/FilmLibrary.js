'use strict';

function Film(id, title, favorite = false, watchdate, rating)
{
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.watchdate = watchdate;
    this.rating = rating;

    this.str = function()
    {
        return id + " " + title + (favorite ? " Preferiti" : " ") + " " + (this.watchdate ? this.watchdate.format("DD/MM/YYYY") : "not watched") + " " + (rating ? rating : "");
    }
}

const sqlite = require('sqlite3');
let dayjs = require("dayjs");

const db = new sqlite.Database('films.db',
    (err) => { if (err) throw err; });


exports.insertFilm = (film) => {
    return new Promise( (resolve, reject) => {
        const sql = 'INSERT INTO films(id, title, favorite, watchdate, rating) VALUES( ?, ?, ?, DATE(?), ?)';
        db.run(sql, [film.id, film.title, film.favorite, film.watchdate, film.rating], (err) => {
            if (err) reject(err); 
            else resolve('Done inserted film '+film.title);
        });
    }) ;
}

exports.getAllFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM films`;
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.getAllFavoriteFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE favorite = true';
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.getFilmsWatchedToday = () =>
{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE watchdate = DATE(?)';
        db.all(sql, [dayjs().format('YYYY-MM-DD')], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.getFilmsWatchedBeforeDate = (date) =>
{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE watchdate < DATE(?)';
        db.all(sql, [date], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.getFilmsRatingHigher = (rating) =>
{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE rating >= ?';
        db.all(sql, [rating], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.getFilmsByTitle = (title) =>
{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE title = ?';
        db.all(sql, [title], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.getFilmsContainingTitle = (title) =>
{
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM films WHERE title LIKE '%' || ? || '%'`;
        db.all(sql, [title], (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
          resolve(films);
        });
      });
}

exports.deleteFilmByID = (film_id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM films WHERE id = ?';
      db.run(sql, [film_id], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve("Film with id "+film_id+" deleted");
      });
    });
  }

  exports.deleteAllWatchDate = () => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE films set watchdate = null';
      db.run(sql, [], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve("All watchdate have been deleted");
      });
    });
  }
exports.closeDataBase = () =>
{
    console.log("Closing DB");
    db.close();
}
