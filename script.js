import { moviesList } from "./data/movies.js";
import {renderAllMovies} from "./helpers.js";
const moviesRow = document.querySelector("#movies-list-row");

// diplay all movies
renderAllMovies(moviesList, moviesRow);

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
      renderAllMovies(_moviesList,moviesRow);
      break;

    case "name-desc":
      // to sort the strings in Descending order | for objects especially
      _moviesList.sort((first, second) =>
        second.title.localeCompare(first.title)
      );
      renderAllMovies(_moviesList,moviesRow);

      break;

    case "rating":
      // to sort the strings in Rating order | for objects especially
      _moviesList.sort((first, second) => second.rating - first.rating);
      renderAllMovies(_moviesList, moviesRow);

      break;

    case "year":
      // to sort the strings in Year order | for objects especially
      _moviesList.sort((first, second) => second.releaseYear - first.releaseYear);
      renderAllMovies(_moviesList,moviesRow);
      break;

    default:
      break;
  }
};
// filter movies by grnras
const handleGenresChange = (event) => {
  const { value } = event.target;

  if (value == -1) {
    renderAllMovies(moviesList,moviesRow);
    return
  }

  const filteredMovies = moviesList.filter((m) => m.genre == value);
  renderAllMovies(filteredMovies, moviesRow);
};
// filter movies by 
const handleIndustryChange = (e) => {
  const { value } = e.target;
  console.log(value);
  if (value == -1) {
    renderAllMovies(moviesList, moviesRow);
    // console.log("all movies");
    return
  }
  const industryMovies = moviesList.filter((m) => m.industry == value)
  renderAllMovies(industryMovies,moviesRow);

}

moviesSort.addEventListener("change", handleSortChange);
genresFilter.addEventListener("change", handleGenresChange);
industrySort.addEventListener("change", handleIndustryChange);
