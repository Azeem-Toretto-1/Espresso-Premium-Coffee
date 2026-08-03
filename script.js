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

//FOOTER REVEAL
const footer = document.querySelector("footer");
const modalImage = document.querySelector(".modal-image img");
const modalTitle = document.querySelector(".modal-content h2");
const modalDescription = document.querySelector(".modal-content p");
const modalPrice = document.querySelector(".modal-bottom h3");

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

//COFFEE DATA
const coffeeData = {
  Latte: {
    image: "./assets/latte.jpg",
    title: "Latte",
    description:
      "A silky smooth espresso blended with perfectly steamed milk for a rich, creamy, and comforting coffee experience.",
    price: "$8.99",
  },

  Mocha: {
    image: "./assets/mocha.jpeg",
    title: "Mocha",
    description:
      "Espresso infused with premium chocolate and steamed milk, finished with a luxurious cocoa flavor.",
    price: "$9.49",
  },

  Affogato: {
    image: "./assets/affogato.jpg",
    title: "Affogato",
    description:
      "A scoop of creamy vanilla gelato topped with freshly brewed espresso for the perfect dessert coffee.",
    price: "$10.99",
  },

  Capucinno: {
    image: "./assets/capuccino.jpg",
    title: "Capuccino",
    description:
      "A balanced blend of espresso, steamed milk, and velvety foam delivering a timeless café favorite.",
    price: "$8.49",
  },

  Americano: {
    image: "./assets/americano.jpg",
    title: "Americano",
    description:
      "Bold espresso softened with hot water, creating a clean, rich, and smooth coffee with deep aroma.",
    price: "$7.99",
  },

  "Flat White": {
    image: "./assets/flat white.jpg",
    title: "Flat White",
    description:
      "Velvety microfoam poured over double espresso for an incredibly smooth and rich coffee texture.",
    price: "$9.29",
  },

  Frappe: {
    image: "./assets/frappe.jpeg",
    title: "Frappe",
    description:
      "An icy blended coffee drink with creamy texture, refreshing flavor, and delightful sweetness.",
    price: "$10.49",
  },

  Cartedo: {
    image: "./assets/cartedo.jpg",
    title: "Cartedo",
    description:
      "A bold espresso perfectly balanced with warm milk, delivering an intense yet smooth coffee finish.",
    price: "$8.79",
  },

  Espresso: {
    image: "./assets/espresso.jpeg",
    title: "Espresso",
    description:
      "Pure premium espresso crafted from freshly roasted Arabica beans with deep aroma and rich crema.",
    price: "$6.99",
  },
};

//COFFEE MODAL
const coffeeCards = document.querySelectorAll(".card");

const coffeeModal = document.querySelector(".coffee-modal");

const closeModalBtn = document.querySelector(".modal-close");

// Open Modal
coffeeCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const coffeeType = card.dataset.type;
    const coffee = coffeeData[coffeeType];

    modalImage.src = coffee.image;
    modalImage.alt = coffee.title;

    modalTitle.textContent = coffee.title;
    modalDescription.textContent = coffee.description;
    modalPrice.textContent = coffee.price;

    coffeeModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close Button
closeModalBtn.addEventListener("click", () => {
  coffeeModal.classList.remove("active");
  document.body.style.overflow = "";
});

// Click Outside
coffeeModal.addEventListener("click", (e) => {
  if (e.target === coffeeModal) {
    coffeeModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Close Modal with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && coffeeModal.classList.contains("active")) {
      coffeeModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// MAGNETIC CARDS
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 18;
    const moveY = (y - rect.height / 2) / 18;

    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0,0)";
  });
});

/* PREMIUM CURSOR */
const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.18;
  currentY += (mouseY - currentY) * 0.18;

  cursor.style.left = currentX + "px";
  cursor.style.top = currentY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

const hoverElements = document.querySelectorAll(
  ".card, .action-btn, .nav-btn, .icons-link, .links",
);

hoverElements.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

/* MAGNETIC BUTTONS */
const magneticButtons = document.querySelectorAll(
  ".nav-btn, .action-btn, .modal-btn, input[type='submit']",
);

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0,0)";
  });
});
