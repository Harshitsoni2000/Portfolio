// jshint esversion: 10

// Using local storage to keep theme change info
let logo = document.querySelectorAll(".logo");
window.addEventListener("DOMContentLoaded", event => {
    if (localStorage.getItem("dark") == "1") {
        body.classList.add("dark-theme");
        logo[0].src = "images/logo-light.svg";
        logo[1].src = "images/logo.svg";
    } else if(localStorage.getItem("dark") == "0") {
        body.classList.remove("dark-theme");
        logo[0].src = "images/logo.svg";
        logo[1].src = "images/logo-light.svg";
    }
});

// Logo
logo.forEach(image => {
    image.addEventListener("click", function(event) {
        body.classList.toggle("dark-theme");
        if (body.classList.contains("dark-theme")) {
            body.dataset.src = "1";
            logo[0].src = "images/logo-light.svg";
            logo[1].src = "images/logo.svg";
            localStorage.setItem("dark", JSON.stringify(1));
        } else {
            body.dataset.src = "0";
            logo[0].src = "images/logo.svg";
            logo[1].src = "images/logo-light.svg";
            localStorage.setItem("dark", JSON.stringify(0));
        }
    });
});

// HINT TEXT
let hint = document.querySelector(".hint");
hint?.animate([{
        transform: "translate(2rem, -50%)",
        opacity: 0
    },
    {
        transform: "translate(0, -50%)",
        opacity: 1
    },
    {
        transform: "translate(2rem, -50%)",
        opacity: 0
    },
], {
    duration: 3000,
    fill: "backwards",
    iterations: "Infinity",
    easing: "ease"
});

// Window load, beforeunload animations
const body = document.querySelector("body");
const main = document.querySelector("main");
window.addEventListener("load", event => {
    event.preventDefault();
    main.animate([{
            opacity: 0,
            transform: "translateY(20rem)"
        },
        {
            opacity: 1,
            transform: "translateY(0)"
        }
    ], {
        duration: 500,
        delay: 50,
        fill: "forwards",
        easing: "ease"
    });
});

window.addEventListener("beforeunload", event => {
    event.preventDefault();
    main.animate([{
            opacity: 1,
            transform: "translateY(0)"
        },
        {
            opacity: 0,
            transform: "translateY(20rem)"
        }
    ], {
        duration: 500,
        delay: 50,
        fill: "forwards",
        easing: "ease"
    });
});

// Header
let navLinks = document.querySelector(".nav__links");
let burgerBtn = document.querySelector(".burger__btn");
let burgerSvg = document.querySelector(".burger");
let footer = document.querySelector(".footer");
let mainHomeDetails = document.querySelectorAll(".main__details");
let mainHomeContact = document.querySelector(".main__contact");

// Toggling Burger Icon
burgerBtn.addEventListener("click", event => {
    [burgerSvg.src, burgerSvg.dataset.src] = [burgerSvg.dataset.src, burgerSvg.src];
    navLinks.classList.toggle("appear");
});

// HOME PAGE

const btnAbout = document.querySelector(".btn__about");
if (btnAbout) {
    btnAbout.addEventListener("click", function(event) {
        // mainHomeDetails.scrollIntoView();
        if (event.target.classList.contains("arrow__block") || event.target.classList.contains("btn")) {
            let {
                left,
                top
            } = mainHomeDetails[0].getBoundingClientRect();
            window.scrollTo({
                left: left + window.pageXOffset,
                top: top + window.pageYOffset,
                behavior: "smooth"
            });
        }
    });
}


if (mainHomeDetails && mainHomeContact) {
    const mainHomeCallback = function(entries, mainHomeObserver) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                mainHomeObserver.unobserve(entry.target);
            }
        });
    };
    const mainHomeOptions = {
        root: null,
        threshold: 0
    };
    let mainHomeObserver = new IntersectionObserver(mainHomeCallback, mainHomeOptions);
    mainHomeDetails.forEach(detail => {
        mainHomeObserver.observe(detail);
    });
    mainHomeObserver.observe(mainHomeContact);
}

const photoMe = document.querySelectorAll(".photo__me");

if (photoMe) {
    const mainHomePhotoCallback = function(entries, mainHomePhotoObserver) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.filter = "blur(0)";
                mainHomePhotoObserver.unobserve(entry.target);
            }
        });
    };
    const mainHomePhotoOptions = {
        root: null,
        threshold: 0.1
    };
    let mainHomePhotoObserver = new IntersectionObserver(mainHomePhotoCallback, mainHomePhotoOptions);
    photoMe.forEach(photo => {
        mainHomePhotoObserver.observe(photo);
    });
}

// CONTACT PAGE

const mainContactForm = document.querySelector(".main__contact-form");
if (mainContactForm) {
    const mainContactCallback = function(entries, mainContactObserver) {
        if (entries[0].isIntersecting) {
            entries[0].target.style.opacity = "1";
            entries[0].target.style.transform = "translateY(0)";
            mainContactObserver.unobserve(entries[0].target);
        }
    };
    const mainContactOptions = {
        root: null,
        threshold: 0.4
    };
    let mainContactObserver = new IntersectionObserver(mainContactCallback, mainContactOptions);
    mainContactObserver.observe(mainContactForm);

    let submit = document.querySelector(".btn-tertiary");
    submit.addEventListener("click", event => {
        let input = document.querySelectorAll(".form__input");
        // console.log(input);
        if(input[0].value.match(/\d/) || input[0].value==="") {
            event.preventDefault();
            input[0].style.border = "2px solid var(--color-red)";
        } else {
            input[0].style.border = "2px solid var(--color-form-input-bg)";
        }
        if(!input[1].value.match(/\w+@\w+\.\w+/) || input[1].value==="") {
            event.preventDefault();
            input[1].style.border = "2px solid var(--color-red)";
        } else {
            input[1].style.border = "2px solid var(--color-form-input-bg)";
        }
    });
}

// PROJECT

const profile = document.querySelector(".profile__photo");
if (profile) {
    const mainProjectCallback = function(entries, mainProjectObserver) {
        if (entries[0].isIntersecting) {
            entries[0].target.style.opacity = "1";
            entries[0].target.style.transform = "translateY(0)";
            mainProjectObserver.unobserve(entries[0].target);
        }
    };
    const mainProjectOptions = {
        root: null,
        threshold: 0.1
    };
    let mainProjectObserver = new IntersectionObserver(mainProjectCallback, mainProjectOptions);
    mainProjectObserver.observe(profile);
}
