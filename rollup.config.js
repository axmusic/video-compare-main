// rollup.config.js
import terser from '@rollup/plugin-terser';
import styles from 'rollup-plugin-styles';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isWatch = process.env.ROLLUP_WATCH;
const version = require('./package.json').version;
const banner = `/*!
* UE Video Comparison - v${version}
* Unlimited Elements for Elementor, Adarsh Pawar.
* Repository: https://github.com/axmusic/video-compare-main
* Based on: https://github.com/LiangrunDa/video-compare
*/`;

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/ue-video-compare.js',
      format: 'iife',
      name: 'UEVideoCompare',
      banner,
      assetFileNames: '[name][extname]'
    },
    {
      file: 'dist/ue-video-compare.min.js',
      format: 'iife',
      name: 'UEVideoCompare',
      plugins: [terser()],
      banner
    },
    {
      file: 'example/js/ue-video-compare.min.js',
      format: 'iife',
      name: 'UEVideoCompare',
      plugins: [terser()],
      banner
    },
    {
      file: 'dist/ue-video-compare.esm.js',
      format: 'es',
      banner
    }
  ],
  plugins: [
    styles({
      mode: 'extract',
    }),
    isWatch && serve({
      contentBase: '.',
      open: true,
      openPage: '/example/index.html',
      port: 10002,
    }),
    isWatch && livereload('dist'),
  ]
};