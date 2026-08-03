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

// OUR COFFEE REVEAL
const coffeeSection = document.querySelector(".coffee-intro");

const coffeeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const image = entry.target.querySelector(".img-part");
      const text = entry.target.querySelector("p");
      const heading = document.querySelector(".working-section h2");

      image.classList.add("reveal-visible");

      setTimeout(() => {
        text.classList.add("reveal-visible");
      }, 220);

      setTimeout(() => {
        heading.classList.add("reveal-visible");
      }, 450);

      coffeeObserver.unobserve(entry.target);
    });
  },

  {
    threshold: 0.35,
  },
);

coffeeObserver.observe(coffeeSection);

// COFFEE CARDS REVEAL
const cardRows = document.querySelectorAll(".card-container");

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const cards = entry.target.querySelectorAll(".card");

      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("reveal-visible");
        }, index * 180);
      });

      cardObserver.unobserve(entry.target);
    });
  },

  {
    threshold: 0.35,
  },
);

cardRows.forEach((row) => {
  cardObserver.observe(row);
});

// BEST COFFEE REVEAL
const bestLines = document.querySelectorAll(".best-line");
const bestVideo = document.querySelector(".working-section video");

const bestObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("reveal-visible");

      bestObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.25,
  },
);

bestLines.forEach((line) => {
  bestObserver.observe(line);
});

bestObserver.observe(bestVideo);

// BEST COFFEE REVEAL
const bestSection = document.querySelector(".working-section:nth-of-type(3)");

const bestItems = document.querySelectorAll(".best-line .reveal, video.reveal");

const bestObservers = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      bestItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("reveal-visible");
        }, index * 180);
      });

      bestObservers.disconnect();
    });
  },
  {
    threshold: 0.25,
  },
);

bestObservers.observe(bestSection);

//OUR ROASTING REVEAL
const roastingContainer = document.querySelector(".roasting-containet");

const roastingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const roastingItems = entry.target.querySelectorAll(".roasting-content");

      roastingItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("reveal-visible");
        }, index * 180);
      });

      roastingObserver.disconnect();
    });
  },
  {
    threshold: 0.25,
  },
);

roastingObserver.observe(roastingContainer);

// ===============================
// PHASE 5.1 - FOOTER REVEAL
// ===============================

const footer = document.querySelector("footer");

const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const footerCols = entry.target.querySelectorAll(".footer-col");

      footerCols.forEach((col, index) => {
        setTimeout(() => {
          col.classList.add("reveal-visible");
        }, index * 180);
      });

      footerObserver.disconnect();
    });
  },
  {
    threshold: 0.25,
  },
);

footerObserver.observe(footer);
