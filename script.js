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

// Navbar Reveal
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector("header").classList.add("reveal-visible");

    setTimeout(() => {
      document.querySelector("h1").classList.add("reveal-visible");

      setTimeout(() => {
        document.querySelector(".hero-img").classList.add("reveal-visible");

        setTimeout(() => {
          document
            .querySelector(".hero-content p")
            .classList.add("reveal-visible");

          setTimeout(() => {
            document
              .querySelector(".hero-content .social-list")
              .classList.add("reveal-visible");

            setTimeout(() => {
              document
                .querySelector(".headline")
                .classList.add("reveal-visible");
            }, 250);
          }, 220);
        }, 300);
      }, 300);
    }, 350);
  }, 2600);
});
