import { genres } from "./data/genres.js";
import { moviesList } from "./data/movies.js";
// import { industry } from "./data/industry.js";
const moviesRow = document.querySelector("#movies-list-row");

const renderAllMovies = (_moviesList) => {
  moviesRow.innerHTML = "";

  _moviesList.slice(0, 4).forEach((movie) => {
    renderMovieItem(movie);
  });
};

const renderMovieItem = (movie) => {
  const movieItemCol = document.createElement("div");
  movieItemCol.className = "col-md-3";

  movieItemCol.innerHTML = `<div class="movie-item shadow mb-5 bg-body-tertiary rounded">
    <div class="movie-item-thumbnail">
      <img
        src="${movie.thumbnail}"
        class="img-fluid"
        alt="movie 1"
      />
      <div class="movie-item-overlay">
        <b>Imdb: ${movie.rating}/10</b>
        <div>
          <span class="fa fa-star text-warning checked"></span>
          <span class="fa fa-star text-warning checked"></span>
          <span class="fa fa-star text-warning checked"></span>
          <span class="fa fa-star text-warning checked"></span>
          <span class="fa fa-star"></span>
        </div>
        <a href="./movieDetails.html?id=${movie.id}">
            <button class="btn btn-outline-warning btn-sm mt-2">View Details</button>
        </a>
      </div>
    </div>

    <div class="basic-info">
      <h6 class="mt-2">${movie.title}</h6>
      <div class="bottom">
        <small>
          <span>${movie.releaseYear}</span>
          <span>|</span>
          <span>${movie.duration || 0} min</span>
        </small>
        <span class="badge text-bg-dark">${getGenreNameById(movie.id)}</span>
      </div>
    </div>
    <br />
  </div>`;

  moviesRow.appendChild(movieItemCol);
};

const getGenreNameById = (id) => {
  // find single genre from the array on the basis of id
  // and return its name
  const genre = genres.find((g) => g.id === id);
  return genre.name;
};

// diplay all movies
renderAllMovies(moviesList);

// event listener for sorting dropdown

const moviesSort = document.querySelector("#movies-sort");
const genresFilter = document.querySelector("#genres-filter");
const industrySort = document.querySelector("#industry-filter")

// sort movies by asc|dec|rating|year
const handleSortChange = (event) => {
  const { value } = event.target;
  const _moviesList = [...moviesList];

  switch (value) {
    case "name-asc":
      // to sort the strings in ascending order | for objects especially
      _moviesList.sort((first, second) =>
        first.title.localeCompare(second.title)
      );
      renderAllMovies(_moviesList);
      break;

    case "name-desc":
      // to sort the strings in Descending order | for objects especially
      _moviesList.sort((first, second) =>
        second.title.localeCompare(first.title)
      );
      renderAllMovies(_moviesList);

      break;

    case "rating":
      // to sort the strings in Rating order | for objects especially
      _moviesList.sort((first, second) => second.rating - first.rating);
      renderAllMovies(_moviesList);

      break;

    case "year":
      // to sort the strings in Year order | for objects especially
      _moviesList.sort((first, second) => second.releaseYear - first.releaseYear);
      renderAllMovies(_moviesList);
      break;

    default:
      break;
  }
};
// filter movies by grnras
const handleGenresChange = (event) => {
  const { value } = event.target;

  if (value == -1) {
    renderAllMovies(moviesList);
    return
  }

  const filteredMovies = moviesList.filter((m) => m.genre == value);
  renderAllMovies(filteredMovies);
};
// filter movies by 
const handleIndustryChange = (e) => {
  const { value } = e.target;
  console.log(value);
  if (value == -1) {
    renderAllMovies(moviesList);
    // console.log("all movies");
    return
  }
  const industryMovies = moviesList.filter((m) => m.industry == value)
  console.log(renderAllMovies(industryMovies));

}

moviesSort.addEventListener("change", handleSortChange);
genresFilter.addEventListener("change", handleGenresChange);
industrySort.addEventListener("change", handleIndustryChange);
