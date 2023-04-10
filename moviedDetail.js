import { moviesList } from "./data/movies.js";
import { genres } from "./data/genres.js";
const searchParams = new URLSearchParams(document.location.search);

const movieId = searchParams.get("id");

const movie = moviesList.find((m) => m.id == movieId);



const thumbnail = document.querySelector('#movie-thumbnail')
const mainTitle = document.querySelector('#movie-title-main')
const releaseYear = document.querySelector('#release-year')
const cast = document.querySelector("#cast")
const rate = document.querySelector("#rate")
const badge = document.querySelector("#badge")
const price = document.querySelector("#price")
const tailer = document.querySelector("#tailer")
const para   =  document.querySelector("#para")
thumbnail.setAttribute("src", movie.thumbnail)
tailer.setAttribute("src",movie.trailer)
mainTitle.innerText = movie.title
releaseYear.innerText = `(${movie.releaseYear})`
cast.innerText =movie.actorsList
rate.innerText = `IMDB RATING: ${movie.rating}/10`
badge.innerText = `Available in: ${movie.resolution}px`
price.innerText = `Price: ${movie.price}/- PKR`
para.innerText = movie.summary


//Related movies logic

//step 1: identifiy realted movies + exclude the current movies
const relatedMovies = moviesList.filter((m)=>m.genre && m.id !== movie.id);


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
  renderAllMovies(relatedMovies);