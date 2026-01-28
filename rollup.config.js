// rollup.config.js
import terser from '@rollup/plugin-terser';
import styles from 'rollup-plugin-styles';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isWatch = process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/video-compare.js',
      format: 'iife',
      name: 'VideoCompare'
    },
    {
      file: 'dist/video-compare.min.js',
      format: 'iife',
      name: 'VideoCompare',
      plugins: [terser()]
    },
    {
      file: 'example/js/video-compare.min.js',
      format: 'iife',
      name: 'VideoCompare',
      plugins: [terser()]
    },
    {
      file: 'dist/video-compare.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    styles({
      inline: true,
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