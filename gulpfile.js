//---------------------------------------------------------------------------------------------
// Set the production Paths
//---------------------------------------------------------------------------------------------

var styles_src	= 'templates/src/scss/*.scss'; // Location to source your scss files from. Usually a specific file, but you can use **/*.scss wildcard
var theme_dest = 'web/assets/';	// Destination root folder
var styles_dest	= theme_dest + 'css/'; // Destination to send your compiled CSS. Will also send a production ready minified css file to this directory

// Array of Javascript files to concatenate and minify
var js_concat = [
	'templates/src/vendor/fancyBox/source/jquery.fancybox.pack.js',
	'templates/src/vendor/fancyBox/source/helpers/jquery.fancybox-media.js',
	'templates/src/vendor/rrssb/js/rrssb.js',
	'templates/src/vendor/enquire/dist/enquire.js',
	'templates/src/vendor/select2/dist/js/select2.js',
	'templates/src/js/scripts.js',
];

var js_dest		= theme_dest + 'js'; // Destination to send your compiled JS scripts to. Will also send a production ready minified css file to this directory

var js_filename	= 'scripts.js';

// Array of Javascript files to move as-is. Will not concatenate or minify
var js_src = [
	'templates/src/vendor/jquery/dist/jquery.min.js'
];

// Array of directories (and those to skip) to validate HTML
var validate_src = 'htdocs/templates/**/*.html';

// Array of directories and font files to copy to production assets
var fonts_src = [
	'templates/src/media/fonts/**/*',
];
var fonts_dest = theme_dest + 'media/fonts'; // Destination to send your font files

var img_src		= 'templates/src/media/images/**/*'; // Directory to copy all images from. This will grab all file extensions.
var img_dest	= theme_dest + 'media/images'; // Destination to send all images to.

// Directories to wipe out. Be careful. Everything in these directories will be deleted.
var clean_dir = [
	theme_dest + 'css',
	theme_dest + 'js',
	theme_dest + 'media/images',
	theme_dest + 'media/fonts',
];


//---------------------------------------------------------------------------------------------
// Load the dependencies
//---------------------------------------------------------------------------------------------

var gulp			= require('gulp'),
    sass			= require('gulp-sass'),
    autoprefixer	= require('gulp-autoprefixer'),
    csscomb			= require('gulp-csscomb'),
    cssnano			= require('gulp-cssnano'),
    htmlhint		= require("gulp-htmlhint"),
    uglify 			= require('gulp-uglify'),
    imagemin 		= require('gulp-imagemin'),
    rename 			= require('gulp-rename'),
    rimraf			= require('gulp-rimraf'),
    concat 			= require('gulp-concat'),
    notify 			= require('gulp-notify'),
    plumber 		= require('gulp-plumber'),
    gutil			= require('gulp-util'),
    runSequence		= require('run-sequence'),
    pngquant        = require('imagemin-pngquant'),
    gulpif          = require('gulp-if'),
    filesize		= require('gulp-filesize'),
    modernizr		= require('gulp-modernizr');

var onError = function (err) {
  gutil.beep();
  console.log(err);
};


//---------------------------------------------------------------------------------------------
// TASK: Modernizr
//---------------------------------------------------------------------------------------------

gulp.task('modernizr', function() {
  gulp.src('templates/src/js/scripts.js')
    .pipe(modernizr({

    // Based on default settings on http://modernizr.com/download/
    "options" : [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
    ],

    // Define any tests you want to explicitly include
    "tests" : [
		"hiddenscroll",
		"ie8compat",
		"ligatures",
		"svg",
		"backgroundblendmode",
		"backgroundcliptext",
		"backgroundsizecover",
		"flexbox",
		"flexboxlegacy",
		"flexboxtweener",
		"lastchild",
		"objectfit",
		"vhunit",
		"vwunit"
    ],

}))
    .pipe(uglify())
    .pipe(gulp.dest(js_dest))

});

//---------------------------------------------------------------------------------------------
// TASK: Styles
//---------------------------------------------------------------------------------------------

 gulp.task('styles', function () {
	return gulp.src(styles_src)
		.pipe(plumber())
    	.pipe(sass({ style: 'expanded', require: 'susy',}).on('error', sass.logError).on('error', onError))
    	.pipe(autoprefixer('last 2 version'))
		.pipe(csscomb())
		.pipe(gulp.dest(styles_dest))
		.pipe(filesize())
		.pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest(styles_dest))
        .pipe(filesize())
		.pipe(notify({ message: 'Styles task complete' }));
});

//---------------------------------------------------------------------------------------------
// TASK: scripts
//---------------------------------------------------------------------------------------------

gulp.task('scripts', function() {

	gulp.src(js_src)
		.pipe(plumber())
		.pipe(gulp.dest(js_dest))
		.pipe(filesize())
		.pipe(notify({ message: 'Scripts copy task complete.' }));


	return gulp.src(js_concat)
		.pipe(plumber())
		.pipe(concat(js_filename))
		.pipe(gulp.dest(js_dest))
		.pipe(filesize())
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(js_dest))
		.pipe(filesize())
		.pipe(notify({ message: 'Scripts concat task complete.' }));
});


//---------------------------------------------------------------------------------------------
// TASK: fonts
//---------------------------------------------------------------------------------------------
gulp.task('fonts', function() {

	return gulp.src(fonts_src)
		.pipe(gulp.dest(fonts_dest))
		.pipe(notify({ message: 'Fonts task complete.' }))
		.pipe(filesize());
});


//---------------------------------------------------------------------------------------------
// TASK: Images
//---------------------------------------------------------------------------------------------

gulp.task('images', function () {
    return gulp.src(img_src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(img_dest))
        .pipe(filesize());
});

//---------------------------------------------------------------------------------------------
// TASK: Validate
//---------------------------------------------------------------------------------------------

gulp.task('validate', function() {

  return gulp.src(validate_src)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});


//---------------------------------------------------------------------------------------------
// TASK: Clean
//---------------------------------------------------------------------------------------------

gulp.task('clean', function() {
  return gulp.src(clean_dir, { read: false }) // much faster
    .pipe(rimraf({ force: true }))
    .pipe(notify({ message: 'Clean task complete.' }));
});





//---------------------------------------------------------------------------------------------
// PRODUCTION TASK: Run `gulp prod`
// This is the production task, It will clean out all of the specified directories,
// compile and minify your sass, concatencate and minify your scripts, move necessary
// fonts, and compress and move images to the assets directory.
//---------------------------------------------------------------------------------------------

gulp.task('build', function() {
	runSequence('clean',
    ['styles', 'modernizr', 'scripts', 'fonts', 'images', 'validate']);
});

//---------------------------------------------------------------------------------------------
// DEVELOPMENT/WATCH TASK: Run `gulp`
// This is the development task. It is the task you will primarily use. It will watch
// for changes in your sass files, and recompile new CSS when it sees changes. It
// will do the same for javascript files as well.
//---------------------------------------------------------------------------------------------

gulp.task('default', function() {

	// Watch .scss files
	gulp.watch('templates/src/**/*.scss', function(event) {
	    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
	    gulp.start('styles');
	});
	// Watch .js files
	gulp.watch('templates/src/js/**/*.js', function(event) {
	    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
	    gulp.start('scripts');
	});

	// Watch .html files
	gulp.watch('templates/**/*.html', function(event) {
	    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
	    gulp.start('validate');
	});

});
