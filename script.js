const navList = document.querySelector("#navList");
const hamburger = document.querySelector("#hamburger");
let cart = JSON.parse(localStorage.getItem("espressoCart")) || [];
let currentProduct = null;
const cartCount = document.querySelector(".cart-count");
const addCartBtn = document.querySelector(".modal-btn");
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCart = document.querySelector(".close-cart");
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.querySelector(".checkout-modal");
const closeCheckout = document.querySelector(".close-checkout");
const checkoutItems = document.querySelector("#checkoutItems");
const checkoutPrice = document.querySelector("#checkoutPrice");
const checkoutForm = document.querySelector(".checkout-form");
const productNav = document.querySelector(".nav-product");
const offersNav = document.querySelector(".nav-offers");
const allCoffeeCards = document.querySelectorAll(".card");
const productsSection = document.querySelector(".working-section.bg-peach");
const processNav = document.querySelector(".nav-process");
const processVideo = document.querySelector(".working-section video");
const packingNav = document.querySelector(".nav-packing");
const roastingSection = document.querySelector(".roasting-section");
const coffeeProductsSection = document.querySelector(".coffee-section");
const roastingLinks = document.querySelectorAll(
  ".roasting-content .action-btn",
);
const orderNowBtn = document.querySelector(".nav-btn");
const modalImage = document.querySelector("#modalImg");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalPrice = document.querySelector("#modalPrice");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("navlist-active");
});

addCartBtn.addEventListener("click", () => {
  if (!currentProduct) return;

  const existingProduct = cart.find((item) => item.id === currentProduct.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...currentProduct,
      quantity: 1,
    });
  }

  saveCart();
  updateCartBadge();
  renderCart();

  showToast(
    "Added to Cart",
    `${currentProduct.name} added successfully.`,
    "☕",
  );

  console.log(cart);
});

function updateCartBadge() {
  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

function saveCart() {
  localStorage.setItem("espressoCart", JSON.stringify(cart));
}

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

// FOOTER REVEAL
const footer = document.querySelector(".footer");

const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const footerItems = entry.target.querySelectorAll(".footer-reveal");

      footerItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("footer-show");
        }, index * 160);
      });

      footerObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
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

    currentProduct = {
      id: card.dataset.id,
      name: card.dataset.name,
      price: Number(card.dataset.price),
      image: card.dataset.image,
    };

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

function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCartSidebar() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
}

cartIcon.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartSidebar);
cartOverlay.addEventListener("click", closeCartSidebar);

const toastContainer = document.querySelector(".toast-container");

function showToast(title, message, icon = "☕") {
  const toast = document.createElement("div");

  toast.className = "toast";

  toast.innerHTML = `
    <div class="toast-icon">
      ${icon}
    </div>

    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>

    <div class="toast-progress"></div>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 450);
  }, 3000);
}

function renderCart() {
  const cartItems = document.querySelector(".cart-items");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Add your favorite coffee ☕</p>
      </div>
    `;

    document.getElementById("cartTotal").textContent = "$0.00";

    return;
  }

  cart.forEach((item) => {
    cartItems.innerHTML += `
<div class="cart-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="cart-item-info">

        <h4>${item.name}</h4>

        <p>$${item.price.toFixed(2)}</p>

        <div class="quantity-box">

            <button class="minus-btn" data-id="${item.id}">
                -
            </button>

            <span>${item.quantity}</span>

            <button class="plus-btn" data-id="${item.id}">
                +
            </button>

        </div>

    </div>

</div>
`;
  });

  document.querySelectorAll(".plus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const product = cart.find((item) => item.id === button.dataset.id);

      product.quantity++;

      saveCart();
      updateCartBadge();
      renderCart();

      showToast(
        "Quantity Updated",
        `${product.name} quantity increased.`,
        "➕",
      );
    });
  });

  document.querySelectorAll(".minus-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const product = cart.find((item) => item.id === button.dataset.id);

      if (product.quantity > 1) {
        product.quantity--;
        saveCart();
        showToast(
          "Quantity Updated",
          `${product.name} quantity decreased.`,
          "➖",
        );
      } else {
        const index = cart.findIndex((item) => item.id === button.dataset.id);

        const removedName = product.name;

        cart.splice(index, 1);

        saveCart();

        showToast("Removed", `${removedName} removed from cart.`, "🗑️");
      }

      updateCartBadge();
      renderCart();
    });
  });

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
}

updateCartBadge();
renderCart();

checkoutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("Cart Empty", "Please add coffee before checkout.", "🛒");
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  checkoutItems.textContent = totalItems;
  checkoutPrice.textContent = `$${totalPrice.toFixed(2)}`;

  checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && checkoutModal.classList.contains("active")) {
    checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  showToast("Order Placed 🎉", "Your coffee is being prepared.", "☕");

  checkoutModal.classList.remove("active");
  document.body.style.overflow = "";

  cart = [];

  localStorage.removeItem("espressoCart");

  updateCartBadge();
  renderCart();

  confetti({
    particleCount: 180,
    spread: 90,
    origin: {
      y: 0.6,
    },
  });

  closeCheckout.click();
  closeCartSidebar();

  checkoutForm.reset();
});

// NAVIGATION - COFFEE PRODUCTS
function showAllCoffee() {
  allCoffeeCards.forEach((card) => {
    card.style.display = "";
  });
}

function showSpecialOffers() {
  allCoffeeCards.forEach((card) => {
    card.style.display = card.dataset.offer === "true" ? "" : "none";
  });
}

// Product
productNav.addEventListener("click", (e) => {
  e.preventDefault();

  showAllCoffee();

  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// Special Offers
offersNav.addEventListener("click", (e) => {
  e.preventDefault();

  showSpecialOffers();

  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

processNav.addEventListener("click", (e) => {
  e.preventDefault();

  processVideo.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  processVideo.play();
});

packingNav.addEventListener("click", (e) => {
  e.preventDefault();

  roastingSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

roastingLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    coffeeProductsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const aboutCoffeeBtn = document.querySelector(".about-btn");

aboutCoffeeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  productsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// ORDER NOW
orderNowBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Show all coffee products
  showAllCoffee();

  // Smooth scroll to Our Coffee
  coffeeProductsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// ABOUT REVEAL
const aboutSection = document.querySelector(".about-section");
const aboutBadge = aboutSection.querySelector(".about-badge");

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const aboutText = entry.target.querySelector(".about-text");
      const aboutImage = entry.target.querySelector(".about-image");

      // Text reveal
      aboutText.classList.add("reveal-visible");

      // Image reveal
      setTimeout(() => {
        aboutImage.classList.add("reveal-visible");
      }, 250);

      // Badge reveal
      setTimeout(() => {
        aboutBadge.classList.add("reveal-visible");
      }, 650);

      aboutObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.25,
  },
);

aboutObserver.observe(aboutSection);
