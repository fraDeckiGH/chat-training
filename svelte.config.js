import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		
		preprocess({
			// "postcss": true,
			postcss: true, // untested
    }),
		
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
		// scss({
		// 	// faster for dart sass, but am I using the dart version?
		// 	renderSync: true,
		// }),
		
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// vite: {},
	},
};

export default config;
