document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const welcomeSlides = document.querySelectorAll("#welcome-section .slide");
  let activeSlideIndex = 0;

  const toggleNavBtn = document.querySelector(".toggle-nav-btn");
  const navMenu = document.querySelector("nav");

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("a");

  const contactForm = document.querySelector("#contact-form");
  const reservationForm = document.querySelector("#reservation-form");

  const changeActiveSlide = () => {
    welcomeSlides[activeSlideIndex].classList.remove("slide-visible");
    welcomeSlides[activeSlideIndex].classList.add("slide-previous");
    welcomeSlides[
      activeSlideIndex - 1 >= 0
        ? activeSlideIndex - 1
        : welcomeSlides.length - 1
    ].classList.remove("slide-previous");

    if (activeSlideIndex + 1 === welcomeSlides.length) activeSlideIndex = 0;
    else activeSlideIndex++;

    welcomeSlides[activeSlideIndex].classList.add("slide-visible");
  };

  setInterval(changeActiveSlide, 5000);

  document.addEventListener("scroll", () => {
    if (window.scrollY > 0) header.classList.add("dark");
    else header.classList.remove("dark");
  });

  toggleNavBtn.addEventListener("click", () => {
    toggleNavBtn.classList.toggle("menu-open");
    navMenu.classList.toggle("open");
  });

  const headerOffset = header.clientHeight + 30 + 10; // header height + margin top + extra bottom margin

  navLinks.forEach((nl) =>
    nl.addEventListener("click", (e) => {
      if (nl.getAttribute("href").startsWith("#")) e.preventDefault();
      const target = document.querySelector(nl.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop - headerOffset,
        behavior: "smooth",
      });
    })
  );

  const handleScroll = () => {
    let current = "";

    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (scrollY >= sectionTop - windowHeight / 2.5) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === `#${current}` ||
        (link.getAttribute("href") === `#about-section` &&
          current === "meet-people-section")
      ) {
        link.classList.add("active");
      }
    });
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  const fakeSubmit = (e) => {
    e.preventDefault();

    const formInputs = e.target.querySelectorAll("input,  textarea")
    formInputs.forEach((i) => {
      i.value = "";
      if (i.type === "time") i.value = "18:30";
    });

    const submitBtn = e.target.querySelector('.yellow-btn')

    submitBtn.classList.add('submitted')
    setTimeout(()=>{submitBtn.classList.remove('submitted')}, 2000)
  };

  contactForm?.addEventListener("submit", fakeSubmit);
  reservationForm?.addEventListener("submit", fakeSubmit);
});
