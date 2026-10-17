// Небольшие улучшения интерфейса без сторонних JS-библиотек.
document.addEventListener("DOMContentLoaded", function () {
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Открыть меню");
      });
    });
  }

  var animatedItems = document.querySelectorAll(".reveal");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    animatedItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
});
