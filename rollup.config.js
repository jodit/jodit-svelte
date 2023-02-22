import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sveltePreprocess from 'svelte-preprocess';

import pkg from './package.json' assert { type: 'json' };

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.module, format: 'es', sourcemap: true },
		{ file: pkg.main, format: 'umd', name: 'JoditEditor' }
	],
	plugins: [
		svelte({
			preprocess: sveltePreprocess()
		}),
		resolve({ browser: true }),
		commonjs()
	]
};
