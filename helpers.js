import { genres } from "./data/genres.js";

 export const renderAllMovies = (_moviesList, moviesRow) => {
    moviesRow.innerHTML = "";
  
    _moviesList.slice(0, 4).forEach((movie) => {
      renderMovieItem(movie, moviesRow);
    });
  };
  
  export const renderMovieItem = (movie,moviesRow) => {
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
  
 export const getGenreNameById = (id) => {
    // find single genre from the array on the basis of id
    // and return its name
    const genre = genres.find((g) => g.id === id);
    return genre.name;
  };
  