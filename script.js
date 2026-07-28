const navList = document.querySelector("#navList");

const hamburger = document.querySelector("#hamburger");

hamburger.addEventListener("click", () => {
    navList.classList.toggle("navlist-active");
})