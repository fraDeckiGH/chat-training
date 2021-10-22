import preprocess from 'svelte-preprocess'
import { moduleExclude } from './plugins/moduleExclude.js';
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
		// ssr: false,
		
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		
		vite: {
			optimizeDeps: {
				include: [
					// * gun (https://gun.eco/docs/Vite)
					// "gun",
					// "gun/gun",
					// "gun/lib/match",
					// "gun/lib/not",
					// "gun/lib/radix",
					// "gun/lib/radisk",
					// "gun/lib/rindexed",
					// "gun/lib/store",
					// "gun/lib/then",
					// "gun/lib/unset",
					// "gun/lib/webrtc",
					// "gun/sea",
					// "gun/sea.js",
					
					// * sanitize.css
					// 'sanitize.css',
					// 'sanitize.css/forms.css',
					// 'sanitize.css/assets.css',
					// 'sanitize.css/typography.css',
					// 'sanitize.css/reduce-motion.css',
					// 'sanitize.css/system-ui.css',
					// 'sanitize.css/ui-monospace.css',
				],
			},
			plugins: [
				moduleExclude('text-encoding'),
			],
			
		},
	},
	
};

export default config;
