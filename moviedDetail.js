import { moviesList } from "./data/movies.js";
import { genres } from "./data/genres.js";
import {renderAllMovies, renderMovieItem} from "./helpers.js"
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
const cartRow = document.querySelector("#cart-row");
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


const relatedMovies = moviesList.filter(
  (m)=> m.genre === movie.genre && m.id !== movie.id
  );
//step 1: identifiy realted movies + exclude the current movies

const moviesRow = document.querySelector("#movies-list-row");
  // diplay all movies
  renderAllMovies(relatedMovies, moviesRow);

  // add to cart functionnality
  const addToCart = () => {  
    // localStorage.removeItem("cartItems")
    // return
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    cartItems.push(movie.id);
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  
  const cartButton = document.querySelector("#cart-btn");
  
  cartButton.addEventListener("click", addToCart);
  
  const renderCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  
    cartItems.forEach((id) => {
      const currentMovie = moviesList.find((m) => m.id === id);
  
      const columnLeft = document.createElement("div");
      const columnRight = document.createElement("div");
  
      columnLeft.className = "col-md-3";
      columnRight.className = "col-md-9";
  
      columnLeft.innerHTML = `<img src="${currentMovie.thumbnail}" class="img-fluid img-thumbnail" alt="" />`;
  
      columnRight.innerHTML = `<h4>${currentMovie.title}</h4>`;
  
      cartRow.appendChild(columnLeft)
      cartRow.appendChild(columnRight)
    });
  };
  
  const cartIcon = document.querySelector('.cart-icon')
  
  cartIcon.addEventListener('click', renderCartItems)