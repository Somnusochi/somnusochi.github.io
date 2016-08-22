var gulp = require("gulp"),
	less = require("gulp-less"),
	gutil = require('gulp-util'),
	browserSync = require("browser-sync"),
	autoprefixer = require('gulp-autoprefixer'),
	path = {
		HTML: "./*.html",
		LESS: "./styles/*.less",
		CSS: "./styles"
	};

gulp.task("serve", ["less", "html"], function() {
	browserSync.init({
		server: "./"
	});

	gulp.watch(path.LESS, ["less"]);
	gulp.watch(path.HTML, ["html"]);
	gulp.watch(path.HTML).on("change", function() {
		browserSync.reload;
	});
});



//将Less文件编译CSS browser-sync支持流 确保dest后面调用.stream()方法;
gulp.task("less", function() {
	gulp.src(path.LESS)
		.pipe(less())
		.on('error', function(err) {
			gutil.log('Less Error!', err.message);
			this.end();
		})
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9',
			'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(path.CSS))
		.pipe(browserSync.stream());
})


gulp.task("html", function() {
	gulp.src(path.HTML)
		.pipe(browserSync.stream());
})

gulp.task("default", ["serve"]);
