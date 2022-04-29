import './style.css'

function SidebarLeft(props) {
    return(
        <div class="list-group list-group-flush">
                    <a href="#/All" id="filter-all" class="list-group-item list-group-item-action active" onClick={() => {props.setFilms(props.filmsTest)}}> All</a>
                    <a href="#/Favorites" id="filter-favorites" class="list-group-item list-group-item-action" onClick={() => {props.deleteFilm('favorites')}}>Favorites</a>
                    <a href="#/BestRated" id="filter-best" class="list-group-item list-group-item-action" onClick={() => {props.deleteFilm('rated')}}>Best Rated</a>
                    <a href="#/SeenLastMonth" id="filter-seen-last-month"class="list-group-item list-group-item-action" onClick={() => {props.deleteFilm('seenLastMonth')}}>Seen Last Month</a>
                    <a href="#/Unseen" id="filter-unseen" class="list-group-item list-group-item-action" onClick={() => {props.deleteFilm('unseen')}}>Unseen</a>
        </div>
    );
}

export { SidebarLeft }