const scrollLinks = document.querySelectorAll(".smooth-link");

function anonym() {
    for (let counter = 0; counter < scrollLinks.length; counter++) {
        scrollLinks[counter].addEventListener("click", (event) => {
            event.preventDefault();
            const id = scrollLinks[counter].getAttribute("href");
            document.querySelector(id).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }
}
anonym();

window.onscroll = function() {
    stickElement();
};

var sidebar = document.querySelector(".main__sidebar");
var content = document.querySelector(".main__content");
var sticky = sidebar.offsetTop;

function stickElement() {
    if (window.pageYOffset >= sticky) {
        sidebar.classList.add("main__sidebar_sticky_true");
        content.classList.add("main__content_sticky_true");
    } else {
        sidebar.classList.remove("main__sidebar_sticky_true");
        content.classList.remove("main__content_sticky_true");
    }
}

var themeToggler = document.querySelector(".checkmark");
var bodyElement = document.querySelector("body");
var checkboxTheme = document.getElementById("checkbox");
themeToggler.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-mode");
    var checkedBool = checkboxTheme.checked;
    localStorage.setItem("theme", checkedBool);
});

var checkedStatus = localStorage.getItem("theme");
if (checkedStatus == "false") {
    checkboxTheme.checked = true;
    bodyElement.classList.toggle("dark-mode");
}