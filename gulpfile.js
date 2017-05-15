const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const nodemon = require("gulp-nodemon");

gulp.task("browser-sync", function() {
	browserSync.init({
		proxy: "localhost:8000",
		port: 4000
	});
});

gulp.task("buildStyles", function() {
	return gulp.src("./source/styles/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 version'],
			cascade: false
		}))
		.pipe(gulp.dest("./dist/styles"));
});

gulp.task("nodemon", function() {
	nodemon({
		script: "server.js",
		ext: "html js",
		env: {"NODE_ENV": "development"}
	});
});

gulp.task("watch", ["buildStyles:watch"], function() {
	gulp.watch(["./*.html", "./dist/**/*.*"], function() {
		console.log("RELOAD WATCH RAN");
		browserSync.reload();
	});
	
});

gulp.task("buildStyles:watch", function() {
	gulp.watch("./source/styles/*.scss", ["buildStyles"]);
});

gulp.task("default", function() {
	gulp.start("buildStyles", "nodemon", "watch", "browser-sync");
});