/* DOM SELECTORS*/
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Navbar
const navList = $("#navList");
const hamburger = $("#hamburger");
const productNav = $(".nav-product");
const offersNav = $(".nav-offers");
const processNav = $(".nav-process");
const packingNav = $(".nav-packing");
const orderNowBtn = $(".nav-btn");
const aboutCoffeeBtn = $(".about-btn");

// Products
const cards = $$(".card");
const productsSection = $(".working-section.bg-peach");
const coffeeProductsSection = $(".coffee-section");

// Process / Roasting
const processVideo = $(".working-section video");
const roastingSection = $(".roasting-section");
const roastingLinks = $$(".roasting-content .action-btn");

// Cart
const cartIcon = $(".cart-icon");
const cartCount = $(".cart-count");
const cartSidebar = $(".cart-sidebar");
const cartOverlay = $(".cart-overlay");
const closeCartBtn = $(".close-cart");
const cartItemsContainer = $(".cart-items");
const cartTotal = $("#cartTotal");

// Coffee Modal
const coffeeModal = $(".coffee-modal");
const closeModalBtn = $(".modal-close");
const addCartBtn = $(".modal-btn");

const modalImage = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalDescription = $("#modalDescription");
const modalPrice = $("#modalPrice");

// Checkout
const checkoutBtn = $(".checkout-btn");
const checkoutModal = $(".checkout-modal");
const closeCheckoutBtn = $(".close-checkout");
const checkoutItems = $("#checkoutItems");
const checkoutPrice = $("#checkoutPrice");
const checkoutForm = $(".checkout-form");

// Toast
const toastContainer = $(".toast-container");

// Loader
const loader = $(".loader");
const progressBar = $(".loader-progress");
const progressText = $(".loader-percent");

// Cursor
const cursor = $(".cursor");

/* STATE */

const CART_STORAGE_KEY = "espressoCart";

let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
let currentProduct = null;

/* GENERAL HELPERS */
function lockBodyScroll() {
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
}

function closeCoffeeModal() {
  if (!coffeeModal) return;

  coffeeModal.classList.remove("active");
  unlockBodyScroll();
}

function closeCheckoutModal() {
  if (!checkoutModal) return;

  checkoutModal.classList.remove("active");
  unlockBodyScroll();
}

/* NAVBAR */
hamburger?.addEventListener("click", () => {
  navList?.classList.toggle("navlist-active");
});

/* TOAST */

function showToast(title, message, icon = "☕") {
  if (!toastContainer) return;

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>

    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
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

/* CART STORAGE */
function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
  if (!cartCount) return;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = totalItems;
}

function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/* CART RENDER */
function renderCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Add your favorite coffee ☕</p>
      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent = "$0.00";
    }

    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">

          <div class="cart-item-info">
            <h4>${item.name}</h4>

            <p>$${item.price.toFixed(2)}</p>

            <div class="quantity-box">
              <button
                class="minus-btn"
                data-id="${item.id}"
                aria-label="Decrease ${item.name} quantity"
              >
                -
              </button>

              <span>${item.quantity}</span>

              <button
                class="plus-btn"
                data-id="${item.id}"
                aria-label="Increase ${item.name} quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>
      `,
    )
    .join("");

  if (cartTotal) {
    cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}

/* ADD TO CART */
function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  updateCartBadge();
  renderCart();

  showToast("Added to Cart", `${product.name} added successfully.`, "☕");
}

addCartBtn?.addEventListener("click", () => {
  if (!currentProduct) return;

  addToCart(currentProduct);
});

/* Event Delegation */

cartItemsContainer?.addEventListener("click", (e) => {
  const button = e.target.closest(".plus-btn, .minus-btn");

  if (!button) return;

  const productId = button.dataset.id;
  const product = cart.find((item) => item.id === productId);

  if (!product) return;

  if (button.classList.contains("plus-btn")) {
    product.quantity++;

    showToast("Quantity Updated", `${product.name} quantity increased.`, "➕");
  }

  if (button.classList.contains("minus-btn")) {
    if (product.quantity > 1) {
      product.quantity--;

      showToast(
        "Quantity Updated",
        `${product.name} quantity decreased.`,
        "➖",
      );
    } else {
      cart = cart.filter((item) => item.id !== productId);

      showToast("Removed", `${product.name} removed from cart.`, "🗑️");
    }
  }

  saveCart();
  updateCartBadge();
  renderCart();
});

/* CART SIDEBAR */

function openCart() {
  cartSidebar?.classList.add("active");
  cartOverlay?.classList.add("active");
}

function closeCartSidebar() {
  cartSidebar?.classList.remove("active");
  cartOverlay?.classList.remove("active");
}

cartIcon?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCartSidebar);
cartOverlay?.addEventListener("click", closeCartSidebar);

/* PREMIUM LOADER */

function startLoader() {
  if (!loader || !progressBar || !progressText) return;

  let progress = 0;

  const loading = setInterval(() => {
    progress++;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(loading);

      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }, 300);
    }
  }, 20);
}

/* HERO REVEAL */
function startHeroReveal() {
  const header = $("header");
  const heroTitle = $("h1");
  const heroImage = $(".hero-img");
  const heroText = $(".hero-content p");
  const socialList = $(".hero-content .social-list");
  const headline = $(".headline");

  const reveal = (element, delay = 0) => {
    if (!element) return;

    setTimeout(() => {
      element.classList.add("reveal-visible");
    }, delay);
  };

  reveal(header, 2600);
  reveal(heroTitle, 2950);
  reveal(heroImage, 3250);
  reveal(heroText, 3550);
  reveal(socialList, 3770);
  reveal(headline, 4020);
}

window.addEventListener("load", startHeroReveal);

/* INTERSECTION OBSERVER HELPER */
function createRevealObserver({
  selector,
  threshold = 0.25,
  stagger = 0,
  className = "reveal-visible",
}) {
  const elements = $$(selector);

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const targets = entry.target.querySelectorAll(".reveal");

        if (targets.length) {
          targets.forEach((target, index) => {
            setTimeout(() => {
              target.classList.add(className);
            }, index * stagger);
          });
        } else {
          entry.target.classList.add(className);
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold },
  );

  elements.forEach((element) => observer.observe(element));
}

/* OUR COFFEE REVEAL */
const coffeeSection = $(".coffee-intro");

if (coffeeSection) {
  const coffeeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const image = entry.target.querySelector(".img-part");
        const text = entry.target.querySelector("p");
        const heading = $(".working-section h2");

        image?.classList.add("reveal-visible");

        setTimeout(() => {
          text?.classList.add("reveal-visible");
        }, 220);

        setTimeout(() => {
          heading?.classList.add("reveal-visible");
        }, 450);

        coffeeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
    },
  );

  coffeeObserver.observe(coffeeSection);
}

/* COFFEE CARDS REVEAL */
const cardRows = $$(".card-container");

if (cardRows.length) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const rowCards = entry.target.querySelectorAll(".card");

        rowCards.forEach((card, index) => {
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
}

/* BEST COFFEE REVEAL */
// BEST COFFEE REVEAL
const bestSection = document.querySelector(".working-section:nth-of-type(3)");

if (bestSection) {
  const bestItems = bestSection.querySelectorAll(
    ".best-line, h2, .reveal, video",
  );

  const bestObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        bestItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("reveal-visible");
          }, index * 180);
        });

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25,
    },
  );

  bestObserver.observe(bestSection);
}

/* ROASTING REVEAL */
const roastingContainer = $(".roasting-containet");

if (roastingContainer) {
  const roastingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const roastingItems =
          entry.target.querySelectorAll(".roasting-content");

        roastingItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("reveal-visible");
          }, index * 180);
        });

        roastingObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25,
    },
  );

  roastingObserver.observe(roastingContainer);
}

/* ABOUT REVEAL */
const aboutSection = $(".about-section");

if (aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const aboutText = entry.target.querySelector(".about-text");
        const aboutImage = entry.target.querySelector(".about-image");
        const aboutBadge = entry.target.querySelector(".about-badge");

        aboutText?.classList.add("reveal-visible");

        setTimeout(() => {
          aboutImage?.classList.add("reveal-visible");
        }, 250);

        setTimeout(() => {
          aboutBadge?.classList.add("reveal-visible");
        }, 650);

        aboutObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25,
    },
  );

  aboutObserver.observe(aboutSection);
}

/* FOOTER REVEAL */
const footer = $(".footer");

if (footer) {
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
}

/* COFFEE DATA */
const coffeeData = {
  Latte: {
    image: "./assets/latte.webp",
    title: "Latte",
    description:
      "A silky smooth espresso blended with perfectly steamed milk for a rich, creamy, and comforting coffee experience.",
    price: "$8.99",
  },

  Mocha: {
    image: "./assets/mocha.webp",
    title: "Mocha",
    description:
      "Espresso infused with premium chocolate and steamed milk, finished with a luxurious cocoa flavor.",
    price: "$9.49",
  },

  Affogato: {
    image: "./assets/affogato.webp",
    title: "Affogato",
    description:
      "A scoop of creamy vanilla gelato topped with freshly brewed espresso for the perfect dessert coffee.",
    price: "$10.99",
  },

  Cappuccino: {
    image: "./assets/capuccino.webp",
    title: "Cappuccino",
    description:
      "A balanced blend of espresso, steamed milk, and velvety foam delivering a timeless café favorite.",
    price: "$8.49",
  },

  Americano: {
    image: "./assets/americano.webp",
    title: "Americano",
    description:
      "Bold espresso softened with hot water, creating a clean, rich, and smooth coffee with deep aroma.",
    price: "$7.99",
  },

  "Flat White": {
    image: "./assets/flat white.webp",
    title: "Flat White",
    description:
      "Velvety microfoam poured over double espresso for an incredibly smooth and rich coffee texture.",
    price: "$9.29",
  },

  Frappe: {
    image: "./assets/frappe.webp",
    title: "Frappe",
    description:
      "An icy blended coffee drink with creamy texture, refreshing flavor, and delightful sweetness.",
    price: "$10.49",
  },

  Cartedo: {
    image: "./assets/cartedo.webp",
    title: "Cartedo",
    description:
      "A bold espresso perfectly balanced with warm milk, delivering an intense yet smooth coffee finish.",
    price: "$8.79",
  },

  Espresso: {
    image: "./assets/espresso.webp",
    title: "Espresso",
    description:
      "Pure premium espresso crafted from freshly roasted Arabica beans with deep aroma and rich crema.",
    price: "$6.99",
  },
};

/* COFFEE MODAL */
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const coffeeType = card.dataset.type;
    const coffee = coffeeData[coffeeType];

    if (!coffee || !coffeeModal) return;

    currentProduct = {
      id: card.dataset.id,
      name: card.dataset.name,
      price: Number(card.dataset.price),
      image: card.dataset.image,
    };

    if (modalImage) {
      modalImage.src = coffee.image;
      modalImage.alt = coffee.title;
    }

    if (modalTitle) {
      modalTitle.textContent = coffee.title;
    }

    if (modalDescription) {
      modalDescription.textContent = coffee.description;
    }

    if (modalPrice) {
      modalPrice.textContent = coffee.price;
    }

    coffeeModal.classList.add("active");
    lockBodyScroll();
  });
});

closeModalBtn?.addEventListener("click", closeCoffeeModal);

coffeeModal?.addEventListener("click", (e) => {
  if (e.target === coffeeModal) {
    closeCoffeeModal();
  }
});

/* MAGNETIC CARDS */
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
    card.style.transform = "translate(0, 0)";
  });
});

/* PREMIUM CURSOR */
if (cursor) {
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

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverElements = $$(`
    .card,
    .action-btn,
    .nav-btn,
    .icons-link,
    .links
  `);

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });
}

/* MAGNETIC BUTTONS */
const magneticButtons = $$(
  ".nav-btn, .action-btn, .modal-btn, input[type='submit']",
);

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;

    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `
      translate(${x * 0.18}px, ${y * 0.18}px)
    `;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

/* CHECKOUT */
checkoutBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("Cart Empty", "Please add coffee before checkout.", "🛒");

    return;
  }

  if (checkoutItems) {
    checkoutItems.textContent = getCartItemCount();
  }

  if (checkoutPrice) {
    checkoutPrice.textContent = `$${getCartTotal().toFixed(2)}`;
  }

  checkoutModal?.classList.add("active");
  lockBodyScroll();
});

closeCheckoutBtn?.addEventListener("click", closeCheckoutModal);

checkoutModal?.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    closeCheckoutModal();
  }
});

checkoutForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  showToast("Order Placed 🎉", "Your coffee is being prepared.", "☕");

  cart = [];

  localStorage.removeItem(CART_STORAGE_KEY);

  updateCartBadge();
  renderCart();

  closeCheckoutModal();
  closeCartSidebar();

  checkoutForm.reset();

  if (typeof confetti === "function") {
    confetti({
      particleCount: 180,
      spread: 90,
      origin: {
        y: 0.6,
      },
    });
  }
});

/* COFFEE FILTERS */
function showAllCoffee() {
  cards.forEach((card) => {
    card.style.display = "";
  });
}

function showSpecialOffers() {
  cards.forEach((card) => {
    card.style.display = card.dataset.offer === "true" ? "" : "none";
  });
}

/* NAVIGATION HELPERS */
function scrollToSection(section, block = "start") {
  section?.scrollIntoView({
    behavior: "smooth",
    block,
  });
}

/* NAVIGATION */
// Products
productNav?.addEventListener("click", (e) => {
  e.preventDefault();

  showAllCoffee();
  scrollToSection(productsSection);
});

// Special Offers
offersNav?.addEventListener("click", (e) => {
  e.preventDefault();

  showSpecialOffers();
  scrollToSection(productsSection);
});

// Process
processNav?.addEventListener("click", (e) => {
  e.preventDefault();

  scrollToSection(processVideo, "center");
  processVideo?.play();
});

// Packing
packingNav?.addEventListener("click", (e) => {
  e.preventDefault();

  scrollToSection(roastingSection);
});

// Roasting buttons
roastingLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    showAllCoffee();
    scrollToSection(coffeeProductsSection);
  });
});

// About Coffee
aboutCoffeeBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  scrollToSection(productsSection);
});

// Order Now
orderNowBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  showAllCoffee();
  scrollToSection(coffeeProductsSection);
});

/* GLOBAL ESCAPE KEY */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  if (coffeeModal?.classList.contains("active")) {
    closeCoffeeModal();
  }

  if (checkoutModal?.classList.contains("active")) {
    closeCheckoutModal();
  }

  if (cartSidebar?.classList.contains("active")) {
    closeCartSidebar();
  }
});

/* INITIALIZATION */
startLoader();
updateCartBadge();
renderCart();
