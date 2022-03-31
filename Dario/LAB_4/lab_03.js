"use strict";
let d = dayjs();
const isBetween = window.dayjs_plugin_isBetween;
dayjs.extend(isBetween);

function Film(id, title, favorite=false, watchdate, rating)
{
	this.id = id;
	this.title = title;
	this.favorite = favorite;
	this.watchdate = watchdate;
	this.rating = rating;
}

function FilmLibrary()
{
    this.films = [];

    this.add = (film) => {
        this.films.push(film);
      };

      
    this.find = (id) => {
        for (const c of this.films)
          if(c.id === id)
            return c;
        return undefined;
      };

      this.filterByFavorite = () => {
        return this.films.filter(film => film.favorite);
    }
	
	this.filterByHighRating = (minrating) => {
        return this.films.filter(film => film.rating >= minrating);
    }

	
	this.getAll = () => {
		return this.films;
	}
	
    
	this.filterLast_7Days = () => {
		return this.films.filter( film => dayjs(film.watchdate).isBetween(dayjs().subtract(7,'day'), dayjs(), 'day')
		);
	}
}


function addListItem_film(film)
{
	let list = document.getElementById("film_list");

	var list_item = document.createElement("div");
	list_item.className = "d-flex flex-row justify-content-between border-bottom border-primary";

	// aggiungo <div> del titolo
	var title_div = document.createElement("div");
	

	var span_title = document.createElement("span");
	span_title.className = ""
	span_title.appendChild(document.createTextNode(film.title));
	if (film.favorite) span_title.className = "text-danger";
	

	title_div.appendChild(span_title);

	list_item.appendChild(title_div);

	//aggiungo <div> per checkbox favorite

	var favorite_div = document.createElement("div");
	

	var label_favorite = document.createElement("label");
	label_favorite.className = "check-container mt-3";

	var favorite_checkbox = document.createElement("input");
	favorite_checkbox.type= "checkbox" ;
	
	if(film.favorite) { 
		favorite_checkbox.checked = "checked";
		label_favorite.appendChild(document.createTextNode('Favorite'))
	}
	else {
		label_favorite.appendChild(document.createTextNode('Not My Favorite'))
	}

	var favorite_span = document.createElement("span");
	favorite_span.className = "checkmark";

	label_favorite.appendChild(favorite_checkbox);
	label_favorite.appendChild(favorite_span);

	favorite_div.appendChild(label_favorite)

	list_item.appendChild(favorite_div);

	// aggiungo <div> per data
	
	var div_date = document.createElement("div");
	div_date.className = "mt-3";

	var span_date = document.createElement("span");
	if(film.watchdate === null) span_date.appendChild(document.createTextNode("Not watched"));
	else span_date.appendChild(document.createTextNode(dayjs(film.watchdate).format('YYYY-MM-DD')));
	
	div_date.appendChild(span_date);

	list_item.appendChild(div_date);

	//aggiungo <div> per rating

	var div_rating = document.createElement("div");

	let i = 0;
	for(i=0; i < film.rating; i++)
	{
		var span_rating = document.createElement("span");
		span_rating.className = "fa fa-star checked";
		div_rating.appendChild(span_rating);
	}

	for(let j = i; j < 5; j++)
	{
		var span_rating = document.createElement("span");
		span_rating.className = "fa fa-star";
		div_rating.appendChild(span_rating);
	}

	list_item.appendChild(div_rating);

	list.appendChild(list_item);
}

function add_filter_listener()
{
	let filter_list = document.getElementById("filter");
	let children = filter_list.childNodes;
	
	for(const c of children)
	{
		c.addEventListener('click', (event) => {
			show_filtered_list(event.target.innerText);
		})
	}
}

function show_filtered_list(active_filter)
{
	clean_filmView();
	select_filterView(active_filter);
	if(active_filter === "Favorite")
	{
		const filtered_films = film_List.filterByFavorite();
		show_film_list(filtered_films);
	}
	if(active_filter === "All")
	{
		const filtered_films = film_List.getAll();
		show_film_list(filtered_films);
	}
	
	if(active_filter === "High Rating")
	{
		const filtered_films = film_List.filterByHighRating(4);
		show_film_list(filtered_films);
	}
	
	if(active_filter === "Watched in last 7 days")
	{
		const filtered_films = film_List.filterLast_7Days();
		show_film_list(filtered_films);
	}
	
}

function show_film_list(films_to_show)
{
	for(const f of films_to_show)
	{
		addListItem_film(f);
	}
}

function select_filterView(active_filter)
{
	let filter_list = document.getElementById("filter");
	let children = filter_list.children;
	
	for(let c of children)
	{
		if (c.classList.contains("active")) c.classList.remove("active");
		if(c.innerText === active_filter) c.classList.add("active");
	}
	
	let filtheader = document.getElementById("filter-header");
	filtheader.removeChild(filtheader.lastChild);
	filtheader.appendChild(document.createTextNode(active_filter));
}

function clean_filmView()
{
	let list = document.getElementById("film_list");
	while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
}

let film_List = new FilmLibrary();

function main()
{
	
	film_List.add(new Film( 12, "Scarface", true,'2022-03-24', 4));
	film_List.add(new Film( 15, "Star Trek", false,'2022-03-22', 2));
	film_List.add(new Film( 14, "Dune", true, null, 4));
	film_List.add(new Film( 16, "Batman", false, null, null));
	film_List.add(new Film( 11, "Ex Machina", true,'2022-03-25', 5));
	
	show_film_list(film_List.films);
	add_filter_listener();
	
	
}

   
main();

