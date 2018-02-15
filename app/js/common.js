var question = prompt("Введите Ваш возраст?"),
    choiseOne = function () {
        alert("Ваш возраст " + question + "лет! Бобро пожаловать!")
    },
    choiseTwo = function () {
        alert("Досвидос амиго!");
        location.href = "about:blank";
    }

if (question >= 18) {
    choiseOne();
} else {
    choiseTwo();
}


