// NAV FUNCTIONALITY START
const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");
const nav = document.querySelectorAll(".nav");

openBtn.addEventListener("click", () => {
  nav.forEach((nav_el) => nav_el.classList.add("visible"));
});

closeBtn.addEventListener("click", () => {
  nav.forEach((nav_el) => nav_el.classList.remove("visible"));
});
// NAV FUNCTIONALITY ENDS

// FETCHING MOVIE APIs START
const API_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const search = document.getElementById("search");
const main = document.querySelector(".main");
const form = document.querySelector("form");

getMovieData(API_URL);

async function getMovieData(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovie(data.results);
}

function showMovie(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, release_date, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
          <div class="view-movie">
            <div class="title">
              <h3>${title}</h3>
              <p>${release_date}</p>
            </div>
  
            <span class="${getClassName(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            ${overview}
          </div>`;

    main.appendChild(movieEl);
  });
}

function getClassName(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchItem = search.value;

  if (searchItem && searchItem !== "") {
    getMovieData(SEARCH_API + searchItem);

    search.value = "";
  } else {
    window.location.reload();
  }
});
// FETCHING MOVIE APIs ENDS
