import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import packageJson from './package.json'
import autoprefixer from 'autoprefixer'
const name = 'ReactColorPicker'

export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: './build/index.umd.js',
      format: 'umd',
      sourcemap: true,
      name: name,
      globals: {
        react: 'React',
        '@wilfredlopez/color-converter': 'ColorConverter',
      },
    },
  ],
  external: [
    // ...Object.keys(packageJson.dependencies),
    '@wilfredlopez/color-converter',
    'react',
    'react-dom',
  ],
  plugins: [
    resolve(),
    peerDepsExternal(),
    commonjs(),
    typescript({
      tsconfigOverride: {
        declaration: true,
        outFile: 'dist/index.js',
        jsx: 'react',
        exclude: [
          'src/App.tsx',
          'src/Render.tsx',
          'src/**/*.test.ts',
          'src/setupTests.ts',
          'src/stories',
        ],
      },
    }),

    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extract: true,
      minimize: true,
    }),
  ],
}
