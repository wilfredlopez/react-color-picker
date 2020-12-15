import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import packageJson from './package.json'
import autoprefixer from 'autoprefixer'

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
  ],
  external: [...Object.keys(packageJson.dependencies || {})],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfigOverride: {
        declaration: true,
        outFile: 'dist/index.js',
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
