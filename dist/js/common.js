var username=prompt("Введите логин"),pwd=function(){switch(prompt("Введите пароль")){case"123":case"333":case"777":alert("Добро пожаловать "+username);break;default:alert("Пароль неверный"),location.href="about:blank"}},login=function(){switch(username){case"guest":alert("Добро пожаловать");break;case"user":case"admin":pwd();break;default:alert("Пользователя с именем "+username+" нет в системе"),location.href="about:blank"}};login();