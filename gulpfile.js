const sass = require('node-sass');
const gulp = require('gulp');
const rename = require("gulp-rename");
const inlineNg2Template = require('gulp-inline-ng2-template');
const fs = require("fs");

const styleProcessor = (stylePath, ext, styleFile, callback) => {
  if (ext[0] === '.scss') {
    let sassObj = sass.renderSync({ file: stylePath, includePaths: ['./node_modules/'] });
    if (sassObj && sassObj['css']){
      styleFile = sassObj.css.toString('utf8');
    }
  }
  return callback(null, styleFile);  
};

gulp.task('inline-build-templates', () => {
    return gulp.src(['./src/app/**/*.ts', '!./src/app/**/**.spec.ts'])
        .pipe(inlineNg2Template({
            target: 'es5',
            base: 'src',
            useRelativePaths: true,
            styleProcessor: styleProcessor
        }))
        .pipe(gulp.dest('./build/app/'));

});


gulp.task('copy-environments', () => {
	return gulp
	    .src(['./src/environments/environment.prod.ts'])
      .pipe(rename("environment.ts"))
	    .pipe(gulp.dest('./build/environments/'));
});

gulp.task('copy-translations', () => {
	return gulp
	    .src(['./src/translations/*.ts'])
	    .pipe(gulp.dest('./build/translations'));
});

gulp.task('package-json', () => {
  var pkgjson = require("./package.json");
  //Just take what we need from package.json
  var libpkg = {
    name: pkgjson.name,
    version: pkgjson.version,
    dependencies: pkgjson.dependencies,
    main: 'app/marketplace_app.module.js'
  }
   fs.writeFileSync('./lib/package.json', JSON.stringify(libpkg, null, 2));
   return;
});