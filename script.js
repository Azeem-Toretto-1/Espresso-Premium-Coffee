const navList = document.querySelector("#navList");

const hamburger = document.querySelector("#hamburger");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("navlist-active");
});

// Premium Loader
const loader = document.querySelector(".loader");
const progressBar = document.querySelector(".loader-progress");
const progressText = document.querySelector(".loader-percent");

let progress = 0;

const loading = setInterval(() => {
  progress++;

  progressBar.style.width = progress + "%";
  progressText.textContent = progress + "%";

  if (progress >= 100) {
    clearInterval(loading);

    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 300);
  }
}, 20);
