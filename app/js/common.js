var pwd = function () {
        var password = prompt("Введите пароль");

        switch (password) {
            case "123":
            case "333":
            case "777":
                alert("Добро пожаловать " + username);
                break;

            default :
                alert("Пароль неверный");
                location.href = "about:blank";
                break;
        }
    },

    login = function () {
        var username = prompt("Введите логин");

        switch (username) {
            case "guest":
                alert("Добро пожаловать");
                break;
            case "user":
            case "admin":
                pwd();
                break;
            default :
                alert("Пользователя с именем " + username + " нет в системе");
                location.href = "about:blank";
                break;
        }
    };

login();