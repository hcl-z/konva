// import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  input: `src/index.ts`,
  output: [
    {
      dir: 'lib',
      format: 'es',
      sourcemap: true,
    },
    // { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    nodeResolve(),
    // Allow json resolution
    // json(),
    // Compile TypeScript files
    typescript({
    }),
    // // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    // commonjs(),
    // // Allow node_modules resolution, so you can use 'external' to control
    // // which external modules to include in the bundle
    // // https://github.com/rollup/rollup-plugin-node-resolve#usage
    // resolve(),

    // Resolve source maps to the original source
    // sourceMaps()
  ],
});
