"use strict";

function Film(id, title, favorite = false, watchDate = null, rating = null) {
  this.id = id;
  this.title = title;
  this.favorite = favorite;
  this.rating = rating;
  this.watchDate = watchDate;

  this.toString = () => {
    return (
      `Id: ${this.id}, ` +
      `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this.rating}, ` +
      `watchDate: ${this.watchDate}`
    );
  };

  this.toDomRow = () => {
    let html = `<div class="col" id="${this.id}">
        ${this.title}
        </div>
        
        <div class="col">
        <i class="${this.favorite
        ? "fa-solid fa-square-check my-blue"
        : "fa-regular fa-square"
      }"></i>
        Favorite
        </div>
        <div class="col">${this.watchDate != null ? this.watchDate.format("DD-MM-YYYY") : ""}</div>
        <div class="col">`;
    for (let i = 0; i < 5; i++) {
      if (i < this.rating) {
        html += '<i class="fa-solid fa-star my-star p-1"></i>';
      } else {
        html += '<i class="fa-regular fa-star p-1"></i>';
      }
    }
    html += `</div>
        <div class="col-1">
        <a href=#>
        <i class="fa-solid fa-trash-can my-page-link"></i>
        </a>
        </div>`;
    return html;
  };
}

function FilmLibrary() {
  this.library = [];

  this.getLibraryFiltered = (filter) => { return this.filterList[filter]() }
  this.addNewFilm = (film) => this.library.push(film);
  this.printLibrary = () =>
    this.library.forEach((f) => console.log(f.toString()));
  this.getLibrary = () => {
    return this.library;
  };
  this.getFavorites = () => {
    return this.library.filter((film) => film.favorite == true);

  }
  this.getBestRated = () => {
    return this.library.filter((film) => film.rating == 5);
  }
  this.getSeenLastMonth = () => {
    return this.library
      .filter((film) => (film.watchDate != null) && (dayjs().diff(film.watchDate, "month") < 1));
  }
  this.getUnseen = () => {
    return this.library.filter((film) => film.watchDate == null);
  }
  this.removeFilmById = (id) => {
    this.library = this.library.filter((film) => film.id != id);
  }

  this.filterList = {
    "all": this.getLibrary,
    "favorite": this.getFavorites,
    "best": this.getBestRated,
    "last": this.getSeenLastMonth,
    "unseen": this.getUnseen
  };
}

const filmList = [
  new Film(0, "Pulp fiction", true, dayjs("2022-03-30"), 5),
  new Film(1, "21 Grams", true, dayjs("2022-03-22"), 4),
  new Film(2, "Star Wars", false, dayjs("2022-01-5"), 5),
  new Film(3, "Matrix"),
  new Film(4, "Shrek"),
];

function DomManager() {
  this.showList = (items, idActive, filmLib) => {
    const unsignedList = document.getElementById("item-list");
    for (const item of items) {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = item.toDomRow();
      listItem.appendChild(row);
      unsignedList.appendChild(listItem);
      const trashCan = listItem.querySelector(".fa-trash-can");
      trashCan.addEventListener('click', (event) => {
        filmLib.removeFilmById(row.firstChild.id);
        this.updateList(filmLib.getLibraryFiltered(idActive), idActive, filmLib);
      });
    }
    const navLink = document.getElementById(idActive);
    navLink.classList.add("active");
    document.getElementById("title").innerText = navLink.innerText;
  };
  this.clearList = () => {
    const unsignedList = document.getElementById("item-list");
    while (unsignedList.lastChild) {
      unsignedList.removeChild(unsignedList.lastChild);
    }
    document.querySelector("#nav-list .active").classList.remove("active");
  };
  this.updateList = (items, idActive, filmLib) => {
    this.clearList();
    this.showList(items, idActive, filmLib);
  }
}

window.addEventListener("load", (event) => {
  const domManager = new DomManager();
  const filmLib = new FilmLibrary();
  for (const film of filmList) {
    filmLib.addNewFilm(film);
  }

  const navFilters = document.querySelectorAll(".nav-link");
  for (const navFilter of navFilters) {
    navFilter.addEventListener('click', (event) => {
      domManager.updateList(filmLib.getLibraryFiltered(navFilter.id), navFilter.id, filmLib);
    })
  }

  domManager.updateList(filmLib.getLibraryFiltered("all"), "all", filmLib);
});
