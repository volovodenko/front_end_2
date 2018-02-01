var gulp = require("gulp"), //підключаєм gulp
	sass = require("gulp-sass"), //підключаєм пакет gulp-sass
    browserSync = require("browser-sync"); //підключаєм пакет BrowserSync

//Препроцесінг sass
gulp.task("sass", function() { //таск з назвою "sass"
	return gulp.src("app/sass/**/*.scss") //берем всі файли файли scss у папці app/sass/  (** - люба вложена папка) 
	.pipe(sass()) //pipe - визов пакета sass (перетворює файли *.sass або *.scss в файли *.css)
	.pipe(gulp.dest("app/css")) //виводим результат перетворення в папку www/css (тут файл не пишеться, тільки папка)
    .pipe(browserSync.reload({stream: true})) //інжектування стилів css наживо в нашу веб-сторінку
});

//Live Reload (перезагрузка страницы после изменения исходных файлов)
//також сервер
gulp.task("browser-sync", function() {
    browserSync({
        server: {  //Сервер
            baseDir: "app"   //Корінь сервера
        } // ,
        //notify: false
        //відключили різні уведомленія які появляються на веб-сторінці
    });
});


//спостерігання за змінами в файлах +
//запуск сервера + Live Reload +
//автоматичний препроцесінг sass
gulp.task("watch", ["browser-sync", "sass"], function() { //в квадратних дужках - таски які виконуємо до запуска таска watch
	gulp.watch("app/sass/**/*.scss", ["sass"]); //слідкуєм за всіма файлами scss. В квадратних дужках - масив тасків які будем при цьому виконувати
    gulp.watch("app/*.html", browserSync.reload);//слідкуєм за всіма файлами html в корні app
    gulp.watch("app/js/*.js", browserSync.reload); //слідкуєм за всіма файлами js в папці js
});