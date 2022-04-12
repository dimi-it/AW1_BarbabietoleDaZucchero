/* 
 * [2021/2022]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 4 
 * 
 * This file emulates a database of movies.
 */

// FILMS array could contains other arrays or other object accordin to developers' preferences.
const FILMS = [
    // Data Strucutre: id, title, favorie, watchDate, rating
    [1, "Pulp Fiction", true, "2022-03-10", 5],
    [2, "21 Grams", true, "2022-03-17", 4],
    [3, "Star Wars", false],
    [4, "Matrix", true],
    [5, "Shrek", false, "2022-03-21", 3]
  
    /*
        {
            "id": 1,
            "title": "Pulp Fiction",
            "favorite": true, 
            "watchDate": new Date("2022-03-10"),
            "rating": 5,
        },
        {
            "id": 2,
            "title": "21 Grams",
            "favorite": true,
            "watchDate": new Date("2022-03-10"),
            "rating": 5,
        },
        {
            "id": 3,
            "title": "Star Wars",
            "favorite": false,
        },
        {
            "id": 4,
            "title": "Matrix",
            "favorite": true,
        },
        {
            "id": 5,
            "title": "Shrek",
            "favorite": false,
            "watchDate": new Date("2022-03-21"),
            "rating": 3,
        }
    */
  ];