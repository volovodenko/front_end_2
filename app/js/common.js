var question = prompt("Введите Ваш возраст?"),
    choise_one = function () {
        alert("Ваш возраст " + question + "лет! Бобро пожаловать!")
    },
    choise_two = function () {
        alert("Досвидос амиго!");
        location.href = "about:blank";
    }

if (question >= 18) {
    choise_one();
} else {
    choise_two();
}


