var gulp = require("gulp"), //підключаєм gulp
	sass = require("gulp-sass"), //підключаєм пакет gulp-sass
    browserSync = require("browser-sync"), //підключаєм пакет BrowserSync
	notify = require("gulp-notify"),  //підключаєм пакет для виводу помилок у вспливаюче вікно
	autoprefixer = require("gulp-autoprefixer") //Автоматичне створення вендорних автопрефіксів
	del = require("del"), //пакет удаления
	imagemin = require("gulp-imagemin"), //пакет для обробки зображень
    pngquant = require("imagemin-pngquant"), //пакет для обробки зображень
	cssnano = require("gulp-cssnano"); //обработчик css
	

//Препроцесінг sass
gulp.task("sass", function() { //таск з назвою "sass"
	return gulp.src("app/sass/**/*.scss") //берем всі файли файли scss у папці app/sass/  (** - люба вложена папка) 
	.pipe(sass({outputStyle: "expanded"}).on('error', notify.onError())) //pipe - визов пакета sass (перетворює файли *.sass або *.scss в файли *.css)
	.pipe(autoprefixer(["last 3 versions"], { cascade: true }))
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


gulp.task("clean", function() {
   return del.sync("dist");  //удаляєм папку dist
});



gulp.task("img", function() {
   return gulp.src("app/img/**/*")
   .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant]
   }))
   .pipe(gulp.dest("dist/img"));
});


//спостерігання за змінами в файлах +
//запуск сервера + Live Reload +
//автоматичний препроцесінг sass
gulp.task("watch", ["browser-sync", "sass"], function() { //в квадратних дужках - таски які виконуємо до запуска таска watch
	gulp.watch("app/sass/**/*.scss", ["sass"]); //слідкуєм за всіма файлами scss. В квадратних дужках - масив тасків які будем при цьому виконувати
    gulp.watch("app/*.html", browserSync.reload);//слідкуєм за всіма файлами html в корні app
    gulp.watch("app/js/*.js", browserSync.reload); //слідкуєм за всіма файлами js в папці js
});




//На продакшн
gulp.task("build", ["clean", "img", "sass"] , function() {
   var buildCss = gulp.src(["app/css/**/*.css"])
   .pipe(cssnano({outputStyle: "compressed"}))
   .pipe(gulp.dest("dist/css"));

   var buildFonts = gulp.src("app/fonts/**/*")  //змінна для шрифтів
   .pipe(gulp.dest("dist/fonts"));

   var buildHtml = gulp.src("app/*.html")  //змінна для файлів Html
   .pipe(gulp.dest("dist"));
   
});