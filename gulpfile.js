let gulp = require('gulp');
let staticHash = require('gulp-static-hash');
let replace = require('gulp-replace');

gulp.task('test', () => {
  console.log('测试环境构建');
  gulp.src(['dist/index.html'])
    .pipe(staticHash({
      exts: ['js', 'css'],
      asset: 'dist', // 相对路径
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});
