import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: 'src/index.ts', // our source file
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es' // the preferred format
    }
    //   {
    //    file: pkg.browser,
    //    format: 'iife',
    //    name: 'MyPackage' // the global which can be used in a browser
    //   }
  ],
  external: [
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],

  plugins: [
    resolve(),
    cjs({
      include: /node_modules/
    }),
    json(),
    typescript({
      module: 'ESNext',
      // eslint-disable-next-line global-require
      typescript: require('typescript')
    }),
    terser() // minifies generated bundles
  ]
};
