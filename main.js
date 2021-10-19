var sortContainer = document.querySelector(".main-projects__sort");
var items = document.querySelectorAll(".js-item");
var tags = document.querySelectorAll(".main-projects__tag");
var projects = document.querySelectorAll(".main-projects__item");
if (document.querySelector(".main-projects__sort-list--period")) {
    var allTimeTabs = document
        .querySelector(".main-projects__sort-list--period")
        .querySelectorAll(".main-projects__sort-item ");
}
if (document.querySelector(".main-projects__tags")) {
    var allDistTabs = document
        .querySelector(".main-projects__tags")
        .querySelectorAll(".main-projects__tag");
}
if (document.querySelector(".main-projects__sort-list--category")) {
    var allDirecTabs = document
        .querySelector(".main-projects__sort-list--category")
        .querySelectorAll(".main-projects__sort-item");
}
// фильтр
var allPosts = [];
var results = [];

// формируем объекты с постами
for (var i = 0; i < projects.length; i++) {
    let directions = projects[i].getAttribute("data-direction");
    let newDirections = directions.split(" ");
    let upgradedDirections = newDirections.filter((element) => element != "");
    var project = {
        id: projects[i].getAttribute("data-id"),
        year: projects[i].getAttribute("data-year"),
        idDirection: upgradedDirections,
        idDistrict: projects[i].getAttribute("data-district"),
    };
    allPosts.push(project);
}

// устанавливаем значения фильтров по умолчанию
var currentYear = 0;
var currentDirection = 0;
var currentDistrict = 0;

// навешиваем обработчики на заголовки списков
var listTitles = document.querySelectorAll(".main-projects__sort-item--title");
for (var i = 0; i < listTitles.length; i++) {
    listTitles[i].addEventListener("click", function() {
        this.parentNode.classList.toggle("open-list");
    });
}
// навешиваем обработчики на элементы списков
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
        var currentTitle = this.parentNode.querySelector(
            ".main-projects__sort-item--title"
        ); // текущий заголовок списка
        var currentItems = this.parentNode.querySelectorAll(".js-item"); // элементы текущего списка

        this.parentNode.classList.toggle("open-list"); // показваем список
        for (var j = 0; j < currentItems.length; j++) {
            // показываем все элементы текущего списка
            currentItems[j].classList.remove("hidden");
        }
        if (screen.width >= 640) {
            if (!this.classList.contains("main-projects__tag")) {
                currentTitle.textContent = this.textContent; // заменяем заголовок списка на выбранный эл-т
                this.classList.add("hidden"); // скрываем текущий элемент в списке
            }
        } else {
            currentTitle.textContent = this.textContent; // заменяем заголовок списка на выбранный эл-т
            this.classList.add("hidden"); // скрываем текущий элемент в списке
            console.log(this);
        }

        if (
            this.parentNode.classList.contains("main-projects__sort-list--period")
        ) {
            // получаем id выбранного года
            currentYear = this.getAttribute("data-id");
        }
        if (
            this.parentNode.classList.contains("main-projects__sort-list--category")
        ) {
            // получаем id выбранного направления
            currentDirection = this.getAttribute("data-id");
        }
        if (
            screen.width > 639 &&
            this.parentNode.classList.contains("main-projects__tags")
        ) {
            currentDistrict = this.getAttribute("data-id");
        } else if (
            screen.width < 640 &&
            this.parentNode.classList.contains("main-projects__tags-mobile")
        ) {
            currentDistrict = this.getAttribute("data-id");
        }

        // получаем объекты постов согласно фильтру
        var results = allPosts.filter(
            (it) =>
            (it.year.includes(currentYear) || currentYear == 0) &&
            (it.idDirection.includes(currentDirection) || currentDirection == 0) &&
            (it.idDistrict.includes(currentDistrict) || currentDistrict == 0)
        );

        var resultsY = allPosts.filter(
            (it) =>
            (it.idDirection.includes(currentDirection) || currentDirection == 0) &&
            (it.idDistrict.includes(currentDistrict) || currentDistrict == 0)
        );

        var resultsDir = allPosts.filter(
            (it) =>
            (it.year.includes(currentYear) || currentYear == 0) &&
            (it.idDistrict.includes(currentDistrict) || currentDistrict == 0)
        );

        var resultsDis = allPosts.filter(
            (it) =>
            (it.year.includes(currentYear) || currentYear == 0) &&
            (it.idDirection.includes(currentDirection) || currentDirection == 0)
        );

        var resultsId = results.map(function(item) {
            // получаем id выводимых постов
            return item.id;
        });

        var resultsYear = resultsY.map(function(item) {
            // получаем года у выводимых постов
            if (item.year != currentYear) {
                return item.year;
            }
        });
        if (currentYear != 0) {
            resultsYear.push("0");
        }

        var resultsIdDirection = resultsDir.map(function(item) {
            // получаем id направления у выводимых постов
            if (item.idDirection != currentDirection) {
                return item.idDirection;
            }
        });
        if (currentDirection != 0) {
            resultsIdDirection.push("0");
        }

        if (screen.width >= 640) {
            var resultsIdDistrict = resultsDis.map(function(item) {
                // получаем id области у выводимых постов
                return item.idDistrict;
            });
            resultsIdDistrict.push("0");
        } else {
            var resultsIdDistrict = resultsDis.map(function(item) {
                if (item.idDistrict != currentDistrict) {
                    return item.idDistrict;
                }
            });
            if (currentDistrict != 0) {
                resultsIdDistrict.push("0");
            }
        }

        // выводим посты
        for (var j = 0; j < projects.length; j++) {
            var ind = resultsId.indexOf(projects[j].getAttribute("data-id"));
            if (ind < 0) {
                projects[j].classList.add("hidden");
            } else {
                projects[j].classList.remove("hidden");
            }
        }
        // выводим года
        var yearItems = document
            .querySelector(".main-projects__sort-list--period")
            .querySelectorAll(".js-item");
        for (var j = 0; j < yearItems.length; j++) {
            var ind = resultsYear.indexOf(yearItems[j].getAttribute("data-id"));
            if (ind < 0) {
                yearItems[j].classList.add("hidden");
            } else {
                yearItems[j].classList.remove("hidden");
            }
        }

        // выводим направления
        var directionItems = document
            .querySelector(".main-projects__sort-list--category")
            .querySelectorAll(".js-item");
        let directionTitle = document
            .querySelector(".main-projects__sort-list--category")
            .querySelector(".main-projects__sort-item--title");
        directionItems.forEach((element) => {
            element.addEventListener("click", () => {
                let elementTitle = element.textContent;
                directionTitle.textContent = elementTitle;
            });
        });

        // выводим области
        var districtItems = document
            .querySelector(".main-projects__tags")
            .querySelectorAll(".js-item");
        for (var j = 0; j < districtItems.length; j++) {
            var ind = resultsIdDistrict.indexOf(
                districtItems[j].getAttribute("data-id")
            );
            if (ind < 0) {
                districtItems[j].classList.add("hidden");
                // districtItemsMobile[j].classList.add('hidden');
            } else {
                districtItems[j].classList.remove("hidden");
                // districtItemsMobile[j].classList.remove('hidden');
            }
            if (districtItems[j].getAttribute("data-id") == currentDistrict) {
                districtItems[j].classList.add("active-tag");
            }
        }

        // выводим области
        var districtItemsMobile = document
            .querySelector(".main-projects__tags-mobile")
            .querySelectorAll(".js-item");
        for (var j = 0; j < districtItemsMobile.length; j++) {
            var ind = resultsIdDistrict.indexOf(
                districtItemsMobile[j].getAttribute("data-id")
            );
            if (ind < 0) {
                districtItemsMobile[j].classList.add("hidden");
            } else {
                districtItemsMobile[j].classList.remove("hidden");
            }
        }
    });
}

// function filterProjects(current, attr) {
//     for (var j = 0; j < projects.length; j++) {
//         if (projects[j].getAttribute(attr) != current && current != 0) {
//             projects[j].classList.add('hidden');
//         } else {
//             projects[j].classList.remove('hidden');
//         }
//     }
// }

function showResult() {
    // document.querySelector('.main-projects__tag--all ').classList.remove('hidden');
    for (var j = 0; j < tags.length; j++) {
        tags[j].classList.remove("active-tag");
    }

    // filterProjects(this.getAttribute('data-id'), 'data-district');

    this.classList.add("active-tag");
}

if (tags && screen.width >= 640) {
    for (var i = 0; i < tags.length; i++) {
        tags[i].addEventListener("click", showResult);
    }
}

// Надстройка над фильтрами, чтобы направления работали тогда, когда это нужно
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function findCommonElements(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
}

function hideUnusedDirections() {
    var allProjects = document.querySelectorAll(".main-projects__item");
    var allDirectionsUsed = [];
    var directionTabs = document
        .querySelector(".main-projects__sort-list--category")
        .querySelectorAll(".main-projects__sort-item");

    allProjects.forEach((element) => {
        if (!element.classList.contains("hidden")) {
            var projectDirection = element.getAttribute("data-direction");
            var formatedAttr = projectDirection.split(" ");
            formatedAttr.forEach((elem) => {
                allDirectionsUsed.push(elem);
            });
        }
    });

    var formatedUsedDirections = allDirectionsUsed.filter(onlyUnique);
    formatedUsedDirections.splice(
        formatedUsedDirections.indexOf(""),
        formatedUsedDirections.indexOf("")
    );
    console.log(formatedUsedDirections);
    var directionIDsTabs = [];
    directionTabs.forEach((element) => {
        var directionID = element.getAttribute("data-id");
        if (directionID != null) {
            directionIDsTabs.push(directionID);
        }
    });
    directionIDsTabs = directionIDsTabs.sort();
    var filteredArray = directionIDsTabs.filter((value) =>
        formatedUsedDirections.includes(value)
    );
    for (let i = 0; i < directionIDsTabs.length; i++) {
        if (filteredArray.indexOf(directionIDsTabs[i]) == -1) {
            var dataID = directionIDsTabs[i];
            if (dataID != "0") {
                var toHideElement = document
                    .querySelector(".main-projects__sort-list--category")
                    .querySelector(`[data-id="${dataID}"]`);
                toHideElement.classList.add("js-item-hidden");
            }
        } else {
            var dataID = directionIDsTabs[i];
            var toHideElement = document
                .querySelector(".main-projects__sort-list--category")
                .querySelector(`[data-id="${dataID}"]`);
            toHideElement.classList.remove("js-item-hidden");
        }
    }
}

function usedDirectionsInDistrctMobile() {
    var activeRegion = document.querySelector(".active-tag");
    var dataID = activeRegion.getAttribute("data-id");
    var allProjectsInRegion = document.querySelectorAll(
        `[data-district="${dataID}"]`
    );
    console.log(allProjectsInRegion);
    var allFilters = document
        .querySelector(".main-projects__sort-list--category")
        .querySelectorAll(".main-projects__sort-item");
    var allFiltersArray = [];
    allFilters.forEach((element) => {
        let directionID = element.getAttribute("data-id");
        if (directionID != null) {
            allFiltersArray.push(directionID);
        }
    });
    var allDirectionInRegion = [];
    allProjectsInRegion.forEach((element) => {
        let directionID = element.getAttribute("data-direction");
        let yearID = element.getAttribute("data-year");
        let chosenYear;
        allTimeTabs.forEach((el) => {
            if (el.classList.contains("main-projects__sort-item--title")) {
                chosenYear = el.textContent;
            }
        });

        if (yearID == chosenYear) {
            if (directionID.indexOf(" ") == -1) {
                allDirectionInRegion.push(directionID);
            } else {
                let formatedDirectionArray = directionID.split(" ");
                formatedDirectionArray.forEach((elem) => {
                    allDirectionInRegion.push(elem);
                });
            }
        }
    });

    allFiltersArray = allFiltersArray.filter(onlyUnique);
    allFiltersArray = allFiltersArray.sort();
    allFiltersArray.splice(
        allFiltersArray.indexOf(""),
        allFiltersArray.indexOf("")
    );
    allDirectionInRegion = allDirectionInRegion.filter(onlyUnique);
    allDirectionInRegion = allDirectionInRegion.sort();
    allDirectionInRegion.splice(
        allDirectionInRegion.indexOf(""),
        allDirectionInRegion.indexOf("")
    );
    for (let i = 0; i < allFiltersArray.length; i++) {
        if (allDirectionInRegion.indexOf(allFiltersArray[i]) != -1) {
            let filterID = allFiltersArray[i];
            let elemNotToHide = document.querySelector(`[data-id="${filterID}"]`);
            elemNotToHide.classList.remove("js-item-hidden");
        }
    }
}

function usedDirectionsInDistrict() {
    var activeRegion = document.querySelector(".active-tag");
    var dataID = activeRegion.getAttribute("data-id");
    var allProjectsInRegion = document.querySelectorAll(
        `[data-district="${dataID}"]`
    );
    var allFilters = document
        .querySelector(".main-projects__sort-list--category")
        .querySelectorAll(".main-projects__sort-item");
    var allFiltersArray = [];
    allFilters.forEach((element) => {
        let directionID = element.getAttribute("data-id");
        if (directionID != null) {
            allFiltersArray.push(directionID);
        }
    });
    var allDirectionInRegion = [];
    allProjectsInRegion.forEach((element) => {
        let directionID = element.getAttribute("data-direction");
        let yearID = element.getAttribute("data-year");
        let chosenYear;
        allTimeTabs.forEach((el) => {
            if (el.classList.contains("main-projects__sort-item--title")) {
                chosenYear = el.textContent;
            }
        });

        if (yearID == chosenYear) {
            if (directionID.indexOf(" ") == -1) {
                allDirectionInRegion.push(directionID);
            } else {
                let formatedDirectionArray = directionID.split(" ");
                formatedDirectionArray.forEach((elem) => {
                    allDirectionInRegion.push(elem);
                });
            }
        }
    });

    allFiltersArray = allFiltersArray.filter(onlyUnique);
    allFiltersArray = allFiltersArray.sort();
    allFiltersArray.splice(
        allFiltersArray.indexOf(""),
        allFiltersArray.indexOf("")
    );
    allDirectionInRegion = allDirectionInRegion.filter(onlyUnique);
    allDirectionInRegion = allDirectionInRegion.sort();
    allDirectionInRegion.splice(
        allDirectionInRegion.indexOf(""),
        allDirectionInRegion.indexOf("")
    );
    for (let i = 0; i < allFiltersArray.length; i++) {
        if (allDirectionInRegion.indexOf(allFiltersArray[i]) != -1) {
            let filterID = allFiltersArray[i];
            let elemNotToHide = document.querySelector(`[data-id="${filterID}"]`);
            console.log(elemNotToHide);
            elemNotToHide.classList.remove("js-item-hidden");
        }
    }
}
if (allTimeTabs) {
    allTimeTabs.forEach((element) => {
        element.addEventListener("click", () => {
            hideUnusedDirections();
        });
    });
}

let intViewportWidth = window.innerWidth;

if (intViewportWidth < 640) {
    console.log("mobile");
    allDistTabs.forEach((element) => {
        element.addEventListener("click", () => {
            hideUnusedDirections();
            usedDirectionsInDistrctMobile();
        });
    });
} else {
    console.log("desk");
    if (allDistTabs) {
        allDistTabs.forEach((element) => {
            element.addEventListener("click", () => {
                hideUnusedDirections();
                usedDirectionsInDistrict();
            });
        });
    }
}