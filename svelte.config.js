import preprocess from 'svelte-preprocess'
import adapterNode from '@sveltejs/adapter-node'
// const scss = preprocess

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// * an array of file extensions that should be treated as Svelte components
	// extensions: [
	// 	// ".css",
	// 	'.svelte',
	// ],
	
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		
		preprocess({
			postcss: true,
    }),
		
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
		// scss({
		// 	includePaths: [
		// 		// "node_modules",
		// 		"src",
		// 	],
		// 	// faster for dart sass, but am I using the dart version?
		// 	// I'm using 'sass' a pure JS port of dart sass pkg, 
		// 	// so is the boost valid?
		// 	renderSync: true,
		// }),
		
	],
	
	kit: {
		/* 
		? "fixes" a bug when using firebase/auth and then running 
		? 'dev' cmd;
		? 'build' cmd runs fine
		  haven't checked if this happens w/ other firebase services as well
		*/
		// https://github.com/sveltejs/kit/tree/master/packages/adapter-node
		// adapter: adapterNode(),
		
		// ssr: false,
		
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
	},
	
};

export default config;
