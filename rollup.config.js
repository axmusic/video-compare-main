// rollup.config.js
import terser from '@rollup/plugin-terser';
import styles from 'rollup-plugin-styles';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isWatch = process.env.ROLLUP_WATCH;
const packageJson = require('./package.json');
const version = packageJson.version;
const banner = `/*!
* UE Video Comparison - v${version}
* Unlimited Elements for Elementor, Adarsh Pawar.
* Repository: https://github.com/AxMusic/video-compare-main
*/`;

const stylesPlugin = styles({
  mode: 'extract',
  extract: 'ue-video-compare.css',
  url: {
    hash: false
  }
});

export default [
  // 1. Distribution Build
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/ue-video-compare.js',
        format: 'iife',
        name: 'UEVideoCompare',
        banner,
        assetFileNames: 'ue-video-compare.css'
      },
      {
        file: 'dist/ue-video-compare.min.js',
        format: 'iife',
        name: 'UEVideoCompare',
        plugins: [terser()],
        banner,
        assetFileNames: 'ue-video-compare.css'
      },
      {
        file: 'dist/ue-video-compare.esm.js',
        format: 'es',
        banner,
        assetFileNames: 'ue-video-compare.css'
      }
    ],
    plugins: [stylesPlugin]
  },
  // 2. Example Build
  {
    input: 'src/index.js',
    output: {
      dir: 'example',
      format: 'iife',
      name: 'UEVideoCompare',
      plugins: [terser()],
      banner,
      entryFileNames: 'js/ue-video-compare.min.js',
      assetFileNames: 'css/ue-video-compare.css'
    },
    plugins: [
      stylesPlugin,
      isWatch && serve({
        contentBase: '.',
        open: true,
        openPage: '/example/index.html',
        port: 10002,
      }),
      isWatch && livereload({
        watch: ['dist', 'example'],
        verbose: false
      }),
    ]
  }
];